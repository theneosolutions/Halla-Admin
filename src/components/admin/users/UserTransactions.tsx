import { CellContext, createColumnHelper } from '@tanstack/react-table';
import GeneralTable from 'components/Table/GeneralTable';
import React, { useState, useEffect } from 'react';

interface Data {
    id: number;
    amount: string;
    description: string;
    paymentId: string;
    status: string;
}

const columnHelper = createColumnHelper<Data>();

const UserTransactions = ({ userId }: { userId: string }) => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [meta, setMeta] = useState({})

    const token = localStorage.getItem('accessToken');


    useEffect(() => {
        fetchEvents();
    }, [userId, page]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/transactions/byUserId/${userId}?order=ASC&page=${page}&take=10`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch user events');
            }
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setData(data.data);
                setTotalPages(data.meta.pageCount);
                setMeta(data.meta)
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

    const columns: { key: string, id: string; header: () => React.ReactNode; cell: (info: { row: { original: Data } }) => React.ReactNode }[] = [
        {
            key: 'id',
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
            key: 'amount',
            id: 'amount',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Amount</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.amount}
                </p>
            ),
        },
        {
            key: 'description',
            id: 'description',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Description</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.description}
                </p>
            ),
        },
        {
            key: 'status',
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
            key: 'paymentId',
            id: 'paymentId',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Payment ID</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.row.original.paymentId}
                </p>
            ),
        },
    ];


    return (
        <div className="mt-14">
            <h2 className="text-xl font-bold mb-2">User Transactions</h2>
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
                        rows: data.map((data, index) => ({
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

export default UserTransactions;
