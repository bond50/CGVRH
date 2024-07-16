// components/crud/SEORead.js
import Link from 'next/link';
import React, { useState } from 'react';
import useSWR from 'swr';
import Alert from '../messages/Alert';
import { fetcher } from '../../axios/axios';

const SEORead = () => {
    const [message, setMessage] = useState('');
    const { data, error, mutate } = useSWR('/seos', url => fetcher(url));
    const seoSettings = Array.isArray(data) ? data : [];

    const deleteSEO = async (id) => {
        try {
            const response = await fetcher(`/seo/${id}`, { method: 'DELETE' });
            setMessage(response.message);
            await mutate('/seos'); // Revalidate the SWR cache
        } catch (err) {
            setMessage(err.response?.data?.error || 'Failed to delete SEO setting.');
        }
    };

    const deleteConfirm = id => {
        if (window.confirm('Are you sure you want to delete this SEO setting?')) {
            deleteSEO(id);
        }
    };

    const showUpdateButton = seo => (
        <Link href={`/admin2/crud/seo/${seo._id}`}>
            <a className="mx-3 btn btn-sm btn-warning">Update</a>
        </Link>
    );

    const showAllSEO = () => (
        seoSettings.map((seo, i) => (
            <div key={i} className="pb-5">
                <h6>{seo.title}</h6>
                <button
                    className="btn btn-sm btn-danger"
                    disabled
                    onClick={() => deleteConfirm(seo._id)}>
                    Delete
                </button>
                {showUpdateButton(seo)}
            </div>
        ))
    );

    if (error) return <Alert msg='Failed to load SEO settings.' label='Error' type='danger' />;
    if (!seoSettings.length) return <div>Loading...</div>;

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>SEO Settings</h3>
                {showAllSEO()}
                {message && <Alert msg={message} label='Success' type='success' />}
            </div>
        </div>
    );
};

export default SEORead;
