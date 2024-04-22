import React, { useEffect, useState } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Progress from 'components/progress';
import { MdCancel, MdCheckCircle, MdOutlineError, MdEdit, MdDelete } from 'react-icons/md';
import moment from 'moment';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

type RowObj = {
  name: string;
  subHeading: string;
  price: number;
  numberOfGuest: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  actions: any
};

const columnHelper = createColumnHelper<RowObj>();

export default function PackagesTable() {
  const [data, setData] = useState<RowObj[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { push } = useRouter();

  useEffect(() => {
    // Fetch data from the API
    fetchData()
  }, []);

  function fetchData() {
    fetch('http://localhost:8000/api/admin/packages?order=DESC&page=1&take=10')
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  const handleEdit = (rowId: string) => {
    push(`/admin/packages/edit/${rowId}`)
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');

    // If user confirms deletion
    if (confirmDelete) {
      const token = localStorage.getItem('accessToken');
      setLoading(true);

      const url = `http://localhost:8000/api/admin/packages/${id}`;

      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to Delete');
        }
        fetchData()

      } catch (error) {
        alert(error.message || 'Failed to Delete');
      } finally {
        setLoading(false);
      }
    }
  };

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('price', {
      id: 'price',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">PRICE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('numberOfGuest', {
      id: 'numberOfGuest',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NUMBER OF GUESTS</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === 'active' ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">CREATED AT</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {moment(info.getValue()).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">UPDATED AT</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {moment(info.getValue()).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
      ),
    }),
    {
      id: 'actions',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ACTIONS</p>
      ),
      cell: (info) => (
        <div className="flex items-center space-x-2">
          <MdEdit className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => handleEdit(info?.row?.original?.id)} />
          <MdDelete className="cursor-pointer text-red-500 dark:text-red-300" onClick={() => handleDelete(info?.row?.original?.id)} />
        </div>
      ),
    },
  ];


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Packages List
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={() => push('/admin/packages/add')} className={`linear rounded-md bg-brand-500 mr-2 px-3 py-1 text-white text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}>
            Add Package
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3  pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                    {/* <td>
                    {flexRender(
                        columns.find(col => col.id === 'actions')?.cell,
                        { row }
                      )}
                    </td> */}

                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
