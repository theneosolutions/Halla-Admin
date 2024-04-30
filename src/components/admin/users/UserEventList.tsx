import { createColumnHelper } from '@tanstack/react-table';
import GeneralTable from 'components/Table/GeneralTable';
import React, { useState, useEffect } from 'react';
import { MdVisibility } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface EventData {
    id: number;
    name: string;
    image: string;
    status: string;
    eventDate: string;
}

const columnHelper = createColumnHelper<EventData>();

const UserEventsList = ({ userId }: { userId: string }) => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [meta, setMeta] = useState({})
    const { push } = useRouter();


    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchEvents();
    }, [userId, page]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/events/byUserId/${userId}?order=ASC&page=${page}&take=10&filter=all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch user events');
            }
            const eventData = await response.json();
            if (Array.isArray(eventData.data)) {
                setEvents(eventData.data);
                setTotalPages(eventData.meta.pageCount);
                setMeta(eventData.meta)
            }
        } catch (error) {
            setError(error.message || 'Failed to fetch user events');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {

        console.log('newPage', newPage);

        setPage(newPage);
    };

    const columns: { id: string; header: () => React.ReactNode; cell: (info: { row: { original: EventData } }) => React.ReactNode }[] = [
        {
            id: 'id',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.id}
                </p>
            ),
        },
        {
            id: 'name',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Name</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.name}
                </p>
            ),
        },
        {
            id: 'image',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Image</p>
            ),
            cell: (info) => (
                <img
                    src={info.row.original.image}
                    alt="Event"
                    className="w-16 h-16 object-cover rounded-md"
                />
            ),
        },
        {
            id: 'status',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Status</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.status}
                </p>
            ),
        },
        {
            id: 'eventDate',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Event Date</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.eventDate}
                </p>
            ),
        },

        {
            id: 'actions',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Actions</p>
            ),
            cell: (info) => (
                <div className="flex items-center">
                    <MdVisibility className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => push(`/admin/events/view/${info?.row?.original?.id}`)} />
                    {/* <MdEdit className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => push(`/admin/users/edit/${info?.row?.original?.id}`)} /> */}
                    {/* <MdDelete className="cursor-pointer text-red-500 dark:text-red-300 ml-1" onClick={() => handleDelete(info?.row?.original?.id)} /> */}
                </div>
            ),
        }
    ];



    return (
        <div className="mt-14">
            <h2 className="text-xl font-bold mb-2">User Events</h2>
            <GeneralTable
                table={{
                    getHeaderGroups: () => [
                        {
                            headers: columns.map(col => ({
                                id: col.id,
                                renderHeader: col.header
                            }))
                        }
                    ],
                    getRowModel: () => ({
                        rows: events.map((data, index) => ({
                            id: data.id,
                            cells: columns.map(col => ({
                                id: col.id,
                                value: col.cell({ row: { original: data } })
                            }))
                        }))
                    })
                }}
                pageMeta={{ ...meta, currentPage: page, pageCount: totalPages }}
                handlePageChange={handlePageChange}
                loading={loading}
            />
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default UserEventsList;
