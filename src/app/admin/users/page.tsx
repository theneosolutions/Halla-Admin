'use client';
import UsersTable from 'components/admin/users/UsersTable';

const Users = () => {
  return (
    <div>
      <div className="mt-5 grid h-full ">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
