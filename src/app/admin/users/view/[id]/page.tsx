'use client';
import React, { useState, useEffect } from 'react';
import EditPage from 'components/admin/web-pages/EditPage';
import ViewUser from 'components/admin/users/UserView';

const Page = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    // console.log('pathname', pathname);

    const parts = pathname.split('/');
    
    const id = parts[parts.length - 1];
    // console.log('id', id);

    if (!Number.isNaN(Number(id))) {
      setUserId(Number(id));
    } else {
      console.error('Invalid page ID');
    }
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full ">
        {userId !== null && <ViewUser userId={userId} />}
      </div>
    </div>
  );
};

export default Page;

