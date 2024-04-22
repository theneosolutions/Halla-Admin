'use client';
import React, { useState, useEffect } from 'react';
import InputField from 'components/fields/InputField';
import Card from 'components/card';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';


const EditUser = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the current URL pathname
  const pathname = window.location.pathname;
  console.log('pathname', pathname);


  // Extract the ID from the pathname
  const id = pathname.split('/').pop();
  console.log('id', id);



  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    fetchData();

  }, [id]);

  const fetchData = async () => {


    const token = localStorage.getItem('accessToken');
    setLoading(true);
    console.log('token', token);


    const url = `http://localhost:8000/api/users/${id}`;

    try {

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to add package');
      // }

      console.log('response', response);

      const data = await response.json();
      console.log('data', data);
      console.log('data.firstName', data.firstName);


      setFirstName(data?.firstName)
      setLastName(data?.lastName)
      setEmail(data?.email)
      setCallingCode(data?.callingCode)
      setPhoneNumber(data?.phoneNumber)
      setAddress(data?.address)

    } catch (error) {
      setError(error.message || 'Failed to add package');
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (event) => {
    const token = localStorage.getItem('accessToken');
    event.preventDefault();

    setLoading(true);

    const url = `http://localhost:8000/api/admin/users/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName, lastName, email, callingCode, phoneNumber, address
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update');
      }

    } catch (error) {
      setError(error.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5 grid h-full ">
        <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
          <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
            {/* EditUser details section */}
            <div className="mt-5 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[720px]">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  {/* First Name */}
                  <InputField
                    extra="mb-3 w-full md:w-1/2 px-3"
                    label="First Name*"
                    placeholder="John"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  {/* Last Name */}
                  <InputField
                    extra="mb-3 w-full md:w-1/2 px-3"
                    label="Last Name*"
                    placeholder="Doe"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  {/* Email */}
                  <InputField
                    extra="mb-3 w-full md:w-1/2 px-3"
                    label="Email*"
                    placeholder="example@example.com"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* Calling Code */}
                  <InputField
                    extra="mb-3 w-full md:w-1/4 px-3"
                    label="Calling Code*"
                    placeholder="+1"
                    id="callingCode"
                    type="text"
                    value={callingCode}
                    onChange={(e) => setCallingCode(e.target.value)}
                  />
                  {/* Phone Number */}
                  <InputField
                    extra="mb-3 w-full md:w-1/4 px-3"
                    label="Phone Number*"
                    placeholder="1234567890"
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                {/* Address */}
                <InputField
                  extra="mb-3 w-full"
                  label="Address*"
                  placeholder="123 Main St"
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  type="submit"
                  className="linear w-full my-5 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          </div>
        </Card>


      </div>
    </div>

  );
};

export default EditUser;
