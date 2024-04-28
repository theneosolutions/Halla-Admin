import { flexRender } from '@tanstack/react-table';
import Card from 'components/card';
import React from 'react';

const GeneralTable = ({ table, pageMeta, handlePageChange, ...props }) => {
    return (
        <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-gray-200">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="cursor-pointer py-2 pr-4 text-left dark:border-white/30"
                                        >
                                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
                                                {header.renderHeader()}
                                                {header.column && header.column.isSorted && (
                                                    <span>
                                                        {header.column.isSortedDesc ? ' ↓' : ' ↑'}
                                                    </span>
                                                )}
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
                                        {row.cells.map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="py-3 pr-4"
                                                >
                                                    {flexRender(
                                                        cell.value,
                                                        {}, // Pass an empty object as the context
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
                        onClick={() => handlePageChange(pageMeta.currentPage - 1)}
                        disabled={!pageMeta?.hasPreviousPage}
                        className={`rounded-md ${pageMeta?.hasPreviousPage ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-700'} mr-2 px-3 py-1 transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: pageMeta.pageCount }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`rounded-md ${pageNum === pageMeta.currentPage ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-700'} mr-2 px-3 py-1 transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button
                        onClick={() => {
                            console.log('clicked');
                            handlePageChange(pageMeta.currentPage + 1)

                        }}
                        disabled={!pageMeta?.hasNextPage}
                        className={`rounded-md ${pageMeta?.hasNextPage ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-700'} mr-2 px-3 py-1 transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
                    >
                        Next
                    </button>
                </div>
            }
        </Card>
    );
};

export default GeneralTable;
