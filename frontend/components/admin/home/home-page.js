import React from 'react';
import classes from './index.module.css'
import useSWR from "swr";
import axios from "axios";
import {API} from "../../../config";
import moment from "moment";
import Link from "next/link";

const fetcher = url => axios.get(url).then(res => res.data)

const HomePage = () => {
    const {data, error} = useSWR(`${API}/pending-blogs`, fetcher)
    if (error) <p>Loading failed...</p>;
    if (!data) <div className='preloader'/>

    function tableRows() {
        return data && data.map(post => {
            return <tr key={post._id}>
                <td>
                    <Link href={`/profile/${post.postedBy.username}`}>
                        <a>{post.postedBy.name.toLowerCase()}</a>
                    </Link>
                </td>
                <td>
                    <h6>{post.title}</h6>
                </td>
                <td> {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{post.status === 0 ? <span className="badge bg-warning">Pending</span> : null}</td>
                <td>
                    <Link href={`/admin2/crud/${post.slug}`}>
                        <span className={ `badge bg-info ${classes.EditBtn}`}>View</span>
                    </Link>
                </td>
            </tr>
        })
    }

    return (
        <div className="col-12">
            <div className={`card ${classes.Blogs}`}>
                <div className="card-body">
                    <h5 className="card-title">Pending posts <span>| Needs Approval</span></h5>
                    <div className="table-responsive">
                        <table className="table table-borderless ">
                            <thead>
                            <tr>
                                <th scope="col">Content Creator</th>
                                <th scope="col">Content title</th>
                                <th scope="col">Date created</th>
                                <th colSpan='2' scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;