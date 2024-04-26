import React, { useState, useEffect } from 'react';
import PageEditor from './WYSIWYGEditor';
import InputField from 'components/fields/InputField';
import Card from 'components/card';

const EditPage = ({ pageId }) => {
    const [pageData, setPageData] = useState({
        type: 'terms-and-conditions',
        title: '',
        content: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [content, setContent] = useState()

    console.log('pageId', pageId);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pages/${pageId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch page data');
            }

            const data = await response.json();
            console.log('data', data);

            setPageData(data);
            setContent(data?.content)
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pages/${pageId}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...pageData,
                    content: content,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update page');
            }

            alert('Page updated successfully!');
        } catch (error) {
            alert(error.message || 'Failed to update page');
        }
    };

    const handleTypeChange = (event) => {
        setPageData({ ...pageData, type: event.target.value });
    };

    const handleTitleChange = (event) => {
        setPageData({ ...pageData, title: event.target.value });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>

            <div className="mt-5 grid h-full ">
                <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
                    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
                        {/* EditUser details section */}
                        <div className="mt-5 w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[720px]">
                            <form onSubmit={handleSave}>
                                <div className="flex flex-wrap -mx-3 mb-6">


                                    <div className="mb-3 w-full md:w-1/2 px-3">
                                        <label
                                            htmlFor={'type'}
                                            className={`text-sm text-navy-700 dark:text-white ml-3 font-bold`}
                                        >
                                            Type
                                        </label>

                                        <select
                                            id="type"
                                            name="type"
                                            className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none`}
                                            value={pageData.type}
                                            onChange={handleTypeChange}
                                        >
                                            <option value="terms-and-conditions">Terms and Conditions</option>
                                            <option value="faq">FAQ</option>
                                        </select>
                                    </div>

                                    <InputField
                                        extra="mb-3 w-full md:w-1/2 px-3"
                                        label="Title*"
                                        placeholder="Enter title"
                                        type="text"
                                        id="title"
                                        value={pageData?.title}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <PageEditor content={content} setContent={setContent} />


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

export default EditPage;
