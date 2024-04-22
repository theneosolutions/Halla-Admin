'use client';
import PackagesTable from 'components/admin/packages/PackagesTable';

const Packages = () => {
  return (
    <div>
      <div className="mt-5 grid h-full ">
        <PackagesTable />
      </div>
    </div>
  );
};

export default Packages;
