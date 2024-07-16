import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import Alert from '../messages/Alert';
import { axiosInstance, fetcher } from '../../axios/axios';

const SEOPageRead = () => {
    const [message, setMessage] = useState('');
    const { data: pages, error, mutate } = useSWR('/all-seo-pages', url => axiosInstance.get(url).then(res => res.data));

    const deletePage = async (id) => {
        try {
            const response = await fetcher(`/seo-page/${id}`, { method: 'DELETE' });
            setMessage(response.message);
            await mutate('/all-seo-pages'); // Update SWR cache
        } catch (err) {
            setMessage(err.response?.data?.error || "Failed to delete page.");
        }
    };

    const deleteConfirm = (id) => {
        if (window.confirm('Are you sure you want to delete this page?')) {
            deletePage(id);
        }
    };

    const showUpdateButton = (page) => (
        <Link href={`/admin2/crud/seopages/${page._id}`}>
            <a className="mx-3 btn btn-sm btn-warning">Update</a>
        </Link>
    );

    const showAllPages = () => (
        pages?.map((page, i) => (
            <div key={i} className="pb-5">
                <h6>{page.name}</h6>
                <p className="mark">
                    URL: {page.url}
                </p>
                <button disabled className="btn btn-sm btn-danger" onClick={() => deleteConfirm(page._id)}>
                    Delete
                </button>
                {showUpdateButton(page)}
            </div>
        ))
    );

    if (error) return <Alert msg='Failed to load pages.' label='Error' type='danger' />;
    if (!pages) return <div>Loading...</div>;

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>SEO Pages</h3>
                {showAllPages()}
                {message && <Alert msg={message} label='Success' type='success' />}
            </div>
        </div>
    );
};

export default SEOPageRead;
