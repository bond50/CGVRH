import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../axios/axios';
import Alert from '../messages/Alert';
import Link from "next/link";

const SEOPageUpdate = ({ id }) => {
    const { data, error: fetchError } = useSWR(`/seo-page/${id}`, fetcher);
    const [values, setValues] = useState({
        name: '',
        url: '',
        error: '',
        success: '',
    });

    const { name, url, error, success } = values;

    useEffect(() => {
        if (data) {
            setValues({ ...values, name: data.name, url: data.url });
        }
    }, [data]);

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: '', success: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetcher(`/seo-page/${id}`, {
                method: 'PUT',
                payload: { name, url },
            });
            setValues({ ...values, success: response.message, error: '' });
            await mutate(`/seo-page/${id}`); // Update SWR cache
        } catch (err) {
            setValues({ ...values, error: err.response?.data?.error || 'Failed to update page.', success: '' });
        }
    };

    return (
        <div className="container">
            <h2>Update SEO Page</h2>
            {(fetchError || error) && <Alert msg={fetchError || error} label="Error" type="danger" />}
            {success && <Alert msg={success} label="Success" type="success" />}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Page Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        readOnly={true}
                        disabled={true}
                        onChange={handleChange('name')}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="text-muted">Page URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={url}
                        onChange={handleChange('url')}
                        required
                    />
                </div>

                <p className="form-group mt-3">You are editing SEO information for <Link href={url}>
                    Click to view the page
                </Link>
                </p>
                <div className="mt-3">
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default SEOPageUpdate;
