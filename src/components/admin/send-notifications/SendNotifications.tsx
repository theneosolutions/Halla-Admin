import React, { useState } from 'react';
import InputField from 'components/fields/InputField';
import Chip from 'components/chips/chips';
import TextArea from 'components/text-area/text-area';
import { debounce } from 'lodash';

const SendNotificationForm = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleUserSelect = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchResults([]);
    setSearch('')
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const handleSearchUsers = async (query) => {
    setSearch(query)
    debounce(searchUsers, 300)()

  };
  const searchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users?search=${search}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error searching users:', error);
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  }

  const handleSendNotification = async () => {
    try {
      setLoading(true);
      const userIds = selectedUsers.map((user) => user.id);
      const notificationData = {
        userIds: userIds,
        content: {
          message: subject,
          body: message,
        },
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/notifications/send-push-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify(notificationData),
      });
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      setError('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <form className="w-full max-w-lg">
        <InputField
          extra="mb-3"
          label="Subject"
          placeholder="Enter subject"
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <div className="relative mb-3">
          <label className="block text-sm font-medium text-gray-700">Search Users</label>
          <input
            type="text"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500"
            placeholder="Search users"
            onChange={(e) => handleSearchUsers(e.target.value)}
            value={search}
          />
          {loading && <p className="text-gray-500 mt-1">Loading...</p>}
          {searchResults?.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
              {searchResults?.map((user) => (
                <li
                  key={user.id}
                  className="cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.firstName + " " + user.lastName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap mb-3">
          {selectedUsers.map((user) => (
            <Chip key={user.id} label={user.firstName + " " + user.lastName} onClose={() => handleUserRemove(user.id)} />
          ))}
        </div>

        <TextArea
          extra="mb-3"
          label="Message"
          placeholder="Enter message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSendNotification}
          className="linear w-full py-3 text-base font-medium text-white bg-brand-500 rounded-xl transition duration-200 hover:bg-brand-600 active:bg-brand-700"
        >
          {loading ? 'Sending...' : 'Send Notification'}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SendNotificationForm;
