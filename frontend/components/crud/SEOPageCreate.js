import React, { useState } from 'react';
import  { mutate } from 'swr';
import { fetcher } from '../../axios/axios';
import Alert from '../messages/Alert';

const SEOPageCreate = () => {
    const [values, setValues] = useState({
        name: '',
        url: '',
        code:'',
        error: '',
        success: '',
    });

    const { name, url, error, success } = values;

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value, error: '', success: '' });
    };

   const handleSubmit = async e => {
    e.preventDefault();
    try {
        const response = await fetcher('/seo-page', {
            method: 'POST',
            payload: { name, url }
        });
        setValues({ ...values, name: '', url: '', error: '', success: response.message });
        await mutate('/seo-page'); // Update SWR cache
    } catch (err) {
        setValues({ ...values, error: err.response?.data?.error || 'Failed to create page.', success: '' });
    }
};


    return (
        <div className="container">
            <h2>Create SEO Page</h2>
            {error && <Alert msg={error} label='Error' type='danger' />}
            {success && <Alert msg={success} label='Success' type='success' />}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Page Name</label>
                    <input
                        type="text" className="form-control" value={name} onChange={handleChange('name')} required/>
                </div>

                <div className="form-group mt-3">
                    <label className="text-muted">Page URL</label>
                    <input type="text" className="form-control" value={url} onChange={handleChange('url')} required/>
                </div>
                <div className='mt-3'>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    );
};

export default SEOPageCreate;
