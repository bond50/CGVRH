import Link from "next/link";
import moment from "moment";
import classes from "../../admin/home/index.module.css";
import React from "react";

export function tableRows(data) {
        return data.map(post => {
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
                <td>{post.accepted===false ? <span className="badge bg-warning">Pending</span> : <span className="badge bg-success">Approved</span> }</td>
                <td>
                    <Link href={`/admin2/crud/${post.slug}`}>
                        <span className={ `badge bg-primary ${classes.EditBtn}`}>View</span>
                    </Link>
                </td>
            </tr>
        })
    }