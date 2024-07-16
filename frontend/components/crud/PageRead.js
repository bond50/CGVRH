import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removePage } from '../../actions/general';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Alert from "../messages/Alert";

dayjs.extend(relativeTime);

const PageRead = ({ username }) => {
    const [pages, setPages] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = () => {
        list(username).then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setPages(data);
            }
        });
    };

    const deletePage = slug => {
        removePage(slug, token).then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage(data.message);
                loadPages();
            }
        });
    };

    const deleteConfirm = slug => {
        if (window.confirm('Are you sure you want to delete your page?')) {
            deletePage(slug);
        }
    };

    const showUpdateButton = page => {
        if (isAuth()) {
            const updatePath = isAuth().role === 0 ? `/user/crud/gen-page/${page.slug}` : `/admin2/crud/gen-page/${page.slug}`;
            return (
                <Link href={updatePath}>
                    <a className="btn mx-3 btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllPages = () => {
        return pages.map((pg, i) => (
            <div key={i} className="pb-5">
                <h6>{pg.title}</h6>
                <p className="mark">
                    Written by {pg.postedBy.name} | Published {dayjs(pg.updatedAt).fromNow()}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pg.slug)}>
                    Delete
                </button>
                {showUpdateButton(pg)}
            </div>
        ));
    };

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Approved Pages</h3>
                {showAllPages()}
                {message && <Alert msg={message} label={message.includes('error') ? 'Error' : 'Success'} type={message.includes('error') ? 'danger' : 'success'} />}
            </div>
        </div>
    );
};

export default PageRead;
