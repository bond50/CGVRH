import React, {Fragment} from 'react';
import Link from "next/link";
import moment from "moment";
import classes from "./index.module.css";

import {isAuth} from "../../../actions/auth";


const DynamicTableRows = ({blog, showModal, user, to}) => {


    return (
        <tr className={classes.tr}>
            {blog && <Fragment>
                <td>
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{isAuth() && isAuth()._id === blog.postedBy._id ? 'Me' : blog.postedBy.name.toLowerCase()}</a>
                    </Link>
                </td>

                <td>
                    <h6>{blog.title}</h6>
                </td>
                <td> {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{
                    blog.accepted === false ? <span className="badge bg-warning">Pending</span> :
                        <span className="badge bg-success">Approved</span>
                }
                </td>
                <td className={classes.td}>
                    <Link href={to}>
                        <span className={`badge bg-primary  ${classes.EditBtn}`}>
                            <i className='bi bi-gear'/>
                        </span>
                    </Link>

                    <span className={`badge bg-danger ${classes.EditBtn}`}
                          onClick={showModal}>
                        <i className='bi bi-x-circle'/>
                    </span>
                </td>
            </Fragment>}


            {user && <Fragment>
                <td>
                    <Link href={`/profile/${user.username}`}>
                        <a>{isAuth() && isAuth()._id === user._id ? "Me" : user.name.toLowerCase()}</a>
                    </Link>
                </td>

                <td>
                    <h6>{user.username}</h6>
                </td>
                <td>
                    <h6>{user.role === 1 ? 'admin' : 'standard user'}</h6>
                </td>
                <td>
                    <h6>{user.email}</h6>
                </td>
                <td className={classes.td}>

                    <Link href={`/profile/${user.username}`}>
                         <span className={`badge bg-primary  ${classes.EditBtn}`}>
                           <i className='bi bi-eye'/>
                       </span>

                    </Link>
                    <Link href={`/admin2/crud/users/${user._id}`}>
                       <span className={`badge bg-primary  ${classes.EditBtn}`}>
                           <i className='bi bi-gear'/>
                       </span>
                    </Link>
                    <span className={`badge bg-danger ${classes.EditBtn}`}
                          onClick={showModal}>
                        <i className='bi bi-x-circle'/>
                    </span>
                </td>


            </Fragment>


            }

        </tr>
    );
};

export default DynamicTableRows;