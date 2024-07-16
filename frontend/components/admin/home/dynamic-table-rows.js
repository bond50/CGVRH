import React, { Fragment } from 'react';
import Link from "next/link";
import dayjs from "dayjs";
import classes from "./index.module.css";
import { isAuth } from "../../../actions/auth";

const DynamicTableRows = ({ blog, user, deleteConfirm, endpoint }) => {

    console.log(endpoint);

    // Ensure endpoint has a valid default value if undefined
    const validEndpoint = endpoint || '#';

    return (
        <>
            <tr className={classes.tr}>
                {blog && (
                    <Fragment>
                        <td>
                            <Link href={`/profile/${blog.postedBy.username}`}>
                                <a>{isAuth() && isAuth()._id === blog.postedBy._id ? 'Me' : blog.postedBy.name.toLowerCase()}</a>
                            </Link>
                        </td>

                        <td>
                            <h6>{blog.title}</h6>
                        </td>
                        <td>{dayjs(blog.createdAt).format('MMMM D YYYY, h:mm:ss a')}</td>
                        <td>
                            {blog.accepted === false ? (
                                <span className="badge bg-warning">Pending</span>
                            ) : (
                                <span className="badge bg-success">Approved</span>
                            )}
                        </td>
                        <td className={classes.td}>
                            <Link href={validEndpoint}>
                                <a className={`badge bg-primary ${classes.EditBtn}`}>
                                    <i className='bi bi-gear' />
                                </a>
                            </Link>

                            <span className={`badge bg-danger ${classes.EditBtn}`} onClick={() => deleteConfirm(blog.slug, blog.title)}>
                                <i className='bi bi-x-circle' />
                            </span>
                        </td>
                    </Fragment>
                )}

                {user && (
                    <Fragment>
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
                                <a className={`badge bg-primary ${classes.EditBtn}`}>
                                    <i className='bi bi-eye' />
                                </a>
                            </Link>
                            <Link href={`/admin2/crud/users/${user._id}`}>
                                <a className={`badge bg-primary ${classes.EditBtn}`}>
                                    <i className='bi bi-gear' />
                                </a>
                            </Link>
                            <span className={`badge bg-danger ${classes.EditBtn}`} onClick={deleteConfirm}>
                                <i className='bi bi-x-circle' />
                            </span>
                        </td>
                    </Fragment>
                )}
            </tr>
        </>
    );
};

export default DynamicTableRows;
