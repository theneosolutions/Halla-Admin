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
// import { useRouter } from 'next/router';

interface RowObj {
  id: number;
  type: string;
  title: string;
  content: string;
  createdAt: Date;
}
const columnHelper = createColumnHelper<RowObj>();

export default function PagesTable(props) {
  const [data, setData] = useState<RowObj[]>([]);
  const [pageMeta, setPageMeta] = useState<any>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1); // Current page number
  const pageSize = 10; // Number of records per page

  const { push } = useRouter();


  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data when page changes

  const fetchData = () => {
    const token = localStorage.getItem('accessToken');
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/pages?order=DESC&page=${page}&take=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        // data.data.map(d => {
        // })
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
    push(`/admin/web-pages/edit/${rowId}`)
  };

  const handleAddPage = () => {
    console.log('here');

    push(`/admin/web-pages/add`)
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this page?');

    if (confirmDelete) {
      const token = localStorage.getItem('accessToken');
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_SERVER}/pages/${id}`;

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

    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
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

    columnHelper.accessor('type', {
      id: 'type',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">TYPE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('title', {
      id: 'title',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">TITLE</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
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
          {/* <MdVisibility className="cursor-pointer text-blue-500 dark:text-blue-300 ml-1" onClick={() => push(`/admin/packages/edit/${info.row.id}`)} /> */}
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
          {props.isHomePage ? 'Recent Pages' : 'Pages List'}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleAddPage()}
            className={`linear rounded-md bg-brand-500 mr-2 px-3 py-1 text-white text-base font-medium  transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}>
            Add Page
          </button>
        </div>
        {/* <CardMenu /> */}
      </div>

      {/* {!props.isHomePage && (
        <div className="flex justify-end mt-4">
          <button
            // onClick={() => handleAddNew()} // Define handleAddNew function
            className="linear rounded-md bg-green-500 px-3 py-1 text-white text-base font-medium transition duration-200 hover:bg-green-600 active:bg-green-700 mr-4"
          >
            Add New
          </button>
        </div>
      )} */}

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
