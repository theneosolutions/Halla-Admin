'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Widget from 'components/widget/Widget';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import { IoDocuments } from 'react-icons/io5';
import InputField from 'components/fields/InputField';
import Card from 'components/card';

interface Invite {
  id: number;
  name: string;
  email: string | null;
  phoneNumber: string;
}

interface Stats {
  GuestNotInvited: string;
  GuestInvited: string;
  GuestConfirmed: string;
  GuestRejected: string;
  GuestMessages: string;
  GuestScanned: string;
  GuestFailed: string;
}

interface UserData {
  loginType: string;
  confirmed: boolean;
  isPhoneVerified: boolean;
  isBanned: boolean;
  id: number;
  firstName: string;
  lastName: string;
}
interface EventData {
  id: number;
  name: string;
  image: string;
  status: string;
  eventDate: string;
  address: string;
  user: UserData;
  invites: Invite[];
  stats: Stats[];
  showQRCode: boolean;
  nearby: string | null;
  latitude: string;
  longitude: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  notes: string;
}



interface EventDetailsPageProps {
  eventId: number;
}

const EventDetailsPage = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  const pathname = window.location.pathname;
  const id = pathname.split('/').pop();


  useEffect(() => {
    fetchData();

  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);


    const token = localStorage.getItem('accessToken');

    const url = `${process.env.NEXT_PUBLIC_SERVER}/events/${id}`;

    try {

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add package');
      }

      console.log('response', response);

      const data = await response.json();
      setEventData(data);
      setIsLoading(false);


    } catch (error) {
      // setError(error.message || 'Failed to add package');
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5 mb-6">
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={'Total Invited Guests'} subtitle={eventData?.stats[0]?.GuestInvited || '0'} />
        <Widget icon={<IoDocuments className="h-6 w-6" />} title={'Confirmed Guests'} subtitle={eventData?.stats[0]?.GuestConfirmed || '0'} />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={'Rejected Guests'} subtitle={eventData?.stats[0]?.GuestRejected || '0'} />
        <Widget icon={<MdDashboard className="h-6 w-6" />} title={'Messages Sent'} subtitle={eventData?.stats[0]?.GuestMessages || '0'} />
        <Widget icon={<MdBarChart className="h-7 w-7" />} title={'Guests Scanned'} subtitle={eventData?.stats[0]?.GuestScanned || '0'} />
      </div>
      <Card extra="mb-6 p-5">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">ID</label>
            <p className="text-lg text-gray-800">{eventData?.id}</p>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Event Name</label>
            <p className="text-lg text-gray-800">{eventData?.name}</p>
          </div>


          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Event Date</label>
            <p className="text-lg text-gray-800">{moment(eventData?.eventDate).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Address</label>
            <p className="text-lg text-gray-800">{eventData?.address}</p>
          </div>


          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Status</label>
            <p className="text-lg text-gray-800">{eventData?.status}</p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Show QR Code</label>
            <p className="text-lg text-gray-800">{eventData?.showQRCode ? 'Yes' : 'No'}</p>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Code</label>
            <p className="text-lg text-gray-800">{eventData?.code}</p>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Created At</label>
            <p className="text-lg text-gray-800">{moment(eventData?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
          </div>

          <div className="w-full px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Event Image</label>
            <img
              src={eventData?.image}
              alt={eventData?.name}
              className="w-64 h-64 object-contain rounded-lg"
            />
          </div>

          <div className="w-full px-4 mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">Hosted by</label>
            <p className="text-lg text-gray-800">{`${eventData?.user?.firstName} ${eventData?.user?.lastName}`}</p>
          </div>

        </div>
      </Card>



      <Card>
        <div className="p-5">
          <h2 className="mb-4 text-xl font-bold">Invited Guests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {eventData?.invites.map((invite: any) => (
                  <tr key={invite.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{invite.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invite.email || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invite.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>



    </div>
  );
};

export default EventDetailsPage;
