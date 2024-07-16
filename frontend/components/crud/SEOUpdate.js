// components/crud/SEOUpdate.js
import React, {useState, useEffect} from 'react';
import useSWR from 'swr';
import {fetcher} from '../../axios/axios';
import Alert from '../messages/Alert';
import {HexColorPicker} from "react-colorful";
import {useRouter} from 'next/router';
import Link from "next/link";

const SEOUpdate = ({id}) => {
    const [values, setValues] = useState({
        page: '',
        title: '',
        description: '',
        keywords: '',
        url: '',
        pageName: '',
        author: '',
        twitterHandle: '',
        imageUrl: '',
        structuredData: {},
        locale: 'en_US',
        themeColor: '#ffffff',
        error: '',
        success: ''
    });

    const {
        page,
        title,
        description,
        keywords,
        author,
        twitterHandle,
        imageUrl,
        url,
        structuredData,
        locale,
        themeColor,
        error,
        success
    } = values;
    const {data: pages, error: pagesError} = useSWR('/all-seo-pages', fetcher);
    const router = useRouter();


    useEffect(() => {
        const fetchSEO = async () => {
            try {
                const response = await fetcher(`/seo-by-id/${id}`);
                setValues(prevValues => ({
                    ...prevValues,
                    ...response,
                    page: response.page._id,
                    url: response.page.url,
                    pageName: response.page.name
                }));
            } catch (err) {
                setValues(prevValues => ({
                    ...prevValues,
                    error: 'Failed to fetch SEO settings.'
                }));
            }
        };
        fetchSEO();
    }, [id]);

    const handleChange = name => e => {
        setValues({...values, [name]: e.target.value, error: '', success: ''});
    };

    const handleColorChange = color => {
        setValues({...values, themeColor: color, error: '', success: ''});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetcher(`/seo/${id}`, {
                method: 'PUT',
                payload: {
                    page,
                    title,
                    description,
                    keywords,
                    author,
                    twitterHandle,
                    imageUrl,
                    structuredData,
                    locale,
                    themeColor
                },
            });
            setValues({...values, error: '', success: response.message});
            setTimeout(() => {
                setValues({...values, success: ''});
                router.push('/admin2/crud/seo'); // Redirect to the list of SEO settings
            }, 2000);
        } catch (err) {
            setValues({...values, error: err.response?.data?.error || 'Failed to update SEO settings.', success: ''});
        }
    };

    return (
        <div className="container">
            <h2>Site Url <Link href={url}>
                {url}
            </Link>
            </h2>

            <p>Page id : {page} (Will never change)</p>


            {error && <Alert msg={error} label='Error' type='danger'/>}
            {success && <Alert msg={success} label='Success' type='success'/>}
            {pagesError && <Alert msg='Failed to load pages.' label='Error' type='danger'/>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className="text-muted">Page</label>
                    <select className="form-control" value={page} onChange={handleChange('page')} required disabled>
                        <option value="">Select a page</option>
                        {pages && pages.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')}
                           required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Meta Description</label>
                    <textarea className="form-control" value={description} onChange={handleChange('description')}
                              required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Keywords</label>
                    <input type="text" className="form-control" value={keywords} onChange={handleChange('keywords')}
                           required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Author</label>
                    <input type="text" className="form-control" value={author} onChange={handleChange('author')}
                           required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Twitter Handle</label>
                    <input type="text" className="form-control" value={twitterHandle}
                           onChange={handleChange('twitterHandle')} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Image URL</label>
                    <input type="text" className="form-control" value={imageUrl} onChange={handleChange('imageUrl')}
                           required/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Locale</label>
                    <input type="text" className="form-control" value={locale} onChange={handleChange('locale')}/>
                </div>
                <div className="form-group mb-3">
                    <label className="text-muted">Theme Color</label>
                    <HexColorPicker color={themeColor} onChange={handleColorChange}/>
                    <input
                        type="text"
                        className="form-control mt-2"
                        value={themeColor}
                        onChange={e => handleColorChange(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary mt-3">Update SEO Setting</button>
            </form>
        </div>
    );
};

export default SEOUpdate;
