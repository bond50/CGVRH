import React, {Fragment} from 'react';
import Link from "next/link";
import moment from "moment";
import classes from "./index.module.css";


const DynamicTableRows = ({blog, showModal, user}) => {

    return (
        <tr className={classes.tr}>
            {blog && <Fragment>
                <td>
                    <Link href={`/profile/${blog.postedBy.username}`}>
                        <a>{blog.postedBy.name.toLowerCase()}</a>
                    </Link>
                </td>

                <td>
                    <h6>{blog.title}</h6>
                </td>
                <td> {moment(blog.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{blog.accepted === false ? <span className="badge bg-warning">Pending</span> :
                    <span className="badge bg-success">Approved</span>}</td>
                <td className={classes.td}>
                    <Link href={`/admin2/crud/${blog.slug}`}>
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
                        <a>{user.name.toLowerCase()}</a>
                    </Link>
                </td>

                <td>
                    <h6>{user.username}</h6>
                </td>
                <td>
                    <h6>{user.role === 1 ? 'admin' : 'normal user'}</h6>
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