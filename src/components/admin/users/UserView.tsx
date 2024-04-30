import React, { useState, useEffect } from 'react';
import Card from 'components/card';
import DefaultAvatar from '../../../../public/img/avatars/avatar-placeholder-250x300.jpg';
import UserEventsList from './UserEventList';
import Widget from 'components/widget/Widget';
import { MdBarChart } from 'react-icons/md';
import { IoDocuments } from 'react-icons/io5';
import UserTransactions from './UserTransactions';
import Banner from './Banner';
import UserDetails from './UserDetails';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string | null;
  status: string;
  loginType: string;
  profilePhoto: string;
  referenceCode: string;
  roles: string;
  confirmed: boolean;
  isBanned: boolean;
  callingCode: string;
  phoneNumber: string;
  address: string;
  wallet: string;
}

const ViewUser = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenueGeneratedByUser: 0,
    userEventCount: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [userId]);

  const token = localStorage.getItem('accessToken');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData: UserData = await response.json();
      setUser(userData);

      const statsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/get-user-stats/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch user stats');
      }
      const stats = await statsResponse.json();

      setStats(stats)

    } catch (error) {
      setError(error.message || 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 grid h-full">


      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-1 2xl:col-span-1 3xl:col-span-1">

          <Banner {...user} {...stats} />
        </div>

        <div className="md:col-span-2 lg:col-span-2 2xl:col-span-2 3xl:col-span-2">
          <UserDetails user={user} />
        </div>
      </div>


      <UserEventsList userId={userId} />

      <UserTransactions userId={userId} />

    </div>
  );
};

export default ViewUser;
