import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Alert from "../messages/Alert";

dayjs.extend(relativeTime);

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        if (window.confirm('Are you sure you want to delete your blog?')) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth()) {
            const updatePath = isAuth().role === 0 ? `/user/crud/${blog.slug}` : `/admin2/crud/${blog.slug}`;
            return (
                <Link href={updatePath}>
                    <a className="btn mx-3 btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => (
            <div key={i} className="pb-5">
                <h6>{blog.title}</h6>
                <p className="mark">
                    Written by {blog.postedBy.name} | Published {dayjs(blog.updatedAt).fromNow()}
                </p>
                <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(blog.slug)}>
                    Delete
                </button>
                {showUpdateButton(blog)}
            </div>
        ));
    };

    return (
        <div className="row">
            <div className="col-md-8">
                <h3>Approved Blogs</h3>
                {showAllBlogs()}
                {message && <Alert msg={message} label={message.includes('error') ? 'Error' : 'Success'} type={message.includes('error') ? 'danger' : 'success'} />}
            </div>
        </div>
    );
};

export default BlogRead;
