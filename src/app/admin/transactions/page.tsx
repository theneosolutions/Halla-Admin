'use client';
import TransactionsTable from 'components/admin/transactions/TransactionsTable';

const Transactions = () => {
  return (
    <div>
      <div className="mt-5 grid h-full ">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions;
