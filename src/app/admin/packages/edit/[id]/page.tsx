'use client';
import React, { useState, useEffect } from 'react';
import InputField from 'components/fields/InputField';
import Card from 'components/card';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';


const EditPackage = () => {

  const [name, setName] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [price, setPrice] = useState('');
  const [numberOfGuest, setNumberOfGuest] = useState('');
  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const { push } = useRouter();

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


    const url = `http://localhost:8000/api/admin/packages/${id}`;

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


      setName(data?.name)
      setSubHeading(data?.subHeading)
      setPrice(data?.price)
      setNumberOfGuest(data?.numberOfGuest)
      setNotes(data?.notes)
      setDescription(data?.description)

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

    const url = `http://localhost:8000/api/admin/packages/${id}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          subHeading,
          price,
          numberOfGuest,
          notes,
          description,
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
            {/* Sign in section */}
            <div className="mt-5 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[720px]">

              {/* name */}
              <form onSubmit={handleSubmit}>
                <div className='flex w-full items-center'>
                  <InputField
                    extra="mb-3 m-3 w-full"
                    label="Name*"
                    placeholder="Premium 🤩"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  {/* subHeading */}
                  <InputField
                    extra="mb-3 m-3 w-full"
                    label="Sub Heading*"
                    placeholder="Most Recommended"
                    id="subHeading"
                    type="text"
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                  />
                </div>

                <div className='flex w-full items-center'>
                  {/* price */}
                  <InputField
                    extra="mb-3 m-3 w-full"
                    label="Price*"
                    placeholder="80"
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  {/* numberOfGuest */}
                  <InputField
                    extra="mb-3 m-3 w-full"
                    label="Number Of Guest*"
                    placeholder="10"
                    id="numberOfGuest"
                    type="text"
                    value={numberOfGuest}
                    onChange={(e) => setNumberOfGuest(e.target.value)}
                  />
                </div>



                {/* notes */}
                <InputField
                  extra="mb-3 m-3 "
                  label="Notes"
                  placeholder="notes for package (optional)"
                  id="notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                {/* Description */}
                <InputField
                  extra="mb-3 m-3 "
                  label="Description"
                  placeholder="Description for package (optional)"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default EditPackage;
