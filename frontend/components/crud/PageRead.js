import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {getCookie, isAuth} from '../../actions/auth';
import {list, removePage} from '../../actions/general';
import moment from 'moment';
import Alert from "../messages/Alert";

const PageRead = ({username}) => {
    const [pages, setPages] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadPages();
    }, []);

    const loadPages = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPages(data);
            }
        });
    };

    const deletePage = slug => {
        removePage(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadPages();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your page?');
        if (answer) {
            deletePage(slug);
        }
    };

    const showUpdateButton = page => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/gen-page/${page.slug}`}>
                    <a className="btn mx-3 btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin2/crud/gen-page/${page.slug}`}>
                    <a className="mx-3 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllPages = () => {
        return pages.map((pg, i) => {
            return (
                <div key={i} className="pb-5">
                    <h6>{pg.title}</h6>
                    <p className="mark">
                        Written by {pg.postedBy.name} | Published on {moment(pg.updatedAt).fromNow()}
                    </p>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(pg.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(pg)}
                </div>
            );
        });
    };


    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Approved Pages</h3>
                {showAllPages()}
                {message && <Alert msg={message} label='Success' type='success'/>}
            </div>
        </div>

    );
};

export default PageRead;