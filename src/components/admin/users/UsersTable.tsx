import React, { useEffect, useState } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Progress from 'components/progress';
import { MdCancel, MdCheckCircle, MdOutlineError, MdEdit, MdDelete, MdVisibility } from 'react-icons/md';
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

import EditUser from 'app/admin/users/edit/[id]/page';

interface RowObj {
  id: number;
  user: string;
  roles: string[];
  email: string;
  status: string;
  createdAt: Date;
}
const columnHelper = createColumnHelper<RowObj>();

export default function UsersTable(props) {
  const [data, setData] = useState<RowObj[]>([]);
  const [pageMeta, setPageMeta] = useState<any>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const { push } = useRouter();


  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    const token = localStorage.getItem('accessToken');
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/users?order=DESC&page=${page}&take=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        data.data.map(d => {
          // console.log('d', d);

          // console.log('d.firstName + " " + d.lastName', d.firstName + " " + d.lastName);

          d.user = d.firstName + " " + d.lastName

          if (!d.email)
            d.email = d.callingCode + " " + d.phoneNumber
        })
        setData(data.data);
        setPageMeta(data.meta)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (rowId: string) => {
    push(`/admin/users/edit/${rowId}`)
  };

  const handleView = (rowId: string) => {
    push(`/admin/users/view/${rowId}`)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      const token = localStorage.getItem('accessToken');
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_SERVER}/admin/users/${id}`;

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

    columnHelper.accessor('user', {
      id: 'user',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">NAME</p>
      ),
      cell: (info) => {
        const userName: any = info.getValue();
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {`${userName}`}
          </p>
        )
      },
    }),

    columnHelper.accessor('roles', {
      id: 'roles',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ROLE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">EMAIL/PHONE #NO</p>
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
          {info.getValue() === 'Paid' ? (
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

    ...(!props.isHomePage ? [{
      id: 'actions',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ACTIONS</p>
      ),
      cell: (info) => (


        <div className="flex items-center">
          <MdVisibility className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => handleView(info?.row?.original?.id)} />
          <MdEdit className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => handleEdit(info?.row?.original?.id)} />
          <MdDelete className="cursor-pointer text-red-500 dark:text-red-300 ml-1" onClick={() => handleDelete(info?.row?.original?.id)} />
        </div>
      ),
    }] : [])
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
          {props.isHomePage ? 'Recent Registered Users' : 'Users List'}
        </div>
        <CardMenu />
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


                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {!props.isHomePage &&
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={!pageMeta?.hasPreviousPage}
            className={`linear rounded-md ${pageMeta?.hasPreviousPage ? 'bg-brand-500' : 'bg-gray-200'} mr-2 px-3 py-1 ${pageMeta?.hasPreviousPage ? 'text-white' : 'text-gray-700'} text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            Previous
          </button>
          {/* {[...Array(pageMeta.pageCount).keys()].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum + 1)}
            className={`linear rounded-md ${page === pageNum + 1 ? 'bg-brand-500' : 'bg-gray-200'} mr-2 px-3 py-1 ${page === pageNum + 1 ? 'text-white' : 'text-gray-700'} text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            {pageNum + 1}
          </button>
        ))} */}

          {[page - 2, page - 1, page, page + 1, page + 2].map((pageNum) => (
            pageNum > 0 && pageNum <= pageMeta.pageCount && (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`linear rounded-md ${page === pageNum ? 'bg-brand-500' : 'bg-gray-200'} mr-2 px-3 py-1 ${page === pageNum ? 'text-white' : 'text-gray-700'} text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
              >
                {pageNum}
              </button>
            )
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!pageMeta?.hasNextPage}
            className={`linear rounded-md ${pageMeta?.hasNextPage ? 'bg-brand-500' : 'bg-gray-200'} mr-2 px-3 py-1 ${pageMeta?.hasNextPage ? 'text-white' : 'text-gray-700'} text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            Next
          </button>
        </div>
      }

    </Card>
  );
}
