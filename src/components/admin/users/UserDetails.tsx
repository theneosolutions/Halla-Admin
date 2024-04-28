import React from 'react';
import Card from 'components/card';

const UserDetails = ({ user }) => {
  return (
    <Card extra="h-full">
      <div className="bg-white rounded-lg p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <UserDetailItem label="ID" value={user?.id} />
              <UserDetailItem label="Username" value={user?.username} />
              <UserDetailItem label="Status" value={user?.status} />
              <UserDetailItem label="Login Type" value={user?.loginType} />
              <UserDetailItem label="Reference Code" value={user?.referenceCode} />
            </div>
            <div className="space-y-6">
              <UserDetailItem label="Confirmed" value={user?.confirmed ? 'Yes' : 'No'} />
              <UserDetailItem label="Is Banned" value={user?.isBanned ? 'Yes' : 'No'} />
              <UserDetailItem label="Calling Code" value={user?.callingCode} />
              <UserDetailItem label="Phone Number" value={user?.phoneNumber} />
              <UserDetailItem label="Address" value={user?.address} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const UserDetailItem = ({ label, value }) => {
  return (
    <div className="flex items-start">
      <p className="w-1/3 text-gray-600 font-medium">{label}:</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
};

export default UserDetails;
