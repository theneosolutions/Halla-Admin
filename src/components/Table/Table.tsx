import React from 'react';

const Table = ({ data, columns, onPageChange, loading, page, totalPages }) => {
  const handlePrevPage = () => {
    onPageChange(page - 1);
  };

  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.id}>{column.header()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.id}>{column.cell(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
            <div>{`Page ${page} of ${totalPages}`}</div>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
