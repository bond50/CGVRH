import React from "react";
import Layout from "../../hoc/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";
import Private from "../../components/auth/Private";


const AdminIndex = () => {
    return (
        <Layout>
            <Private>
                <div className='row'>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <a href={`/user/crud/blog`}>Create Blog</a>
                            </li>
                            <li className="list-group-item">
                                <Link href="/user/crud/blogs">
                                    <a>Update/Delete Blog</a>
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link href={`/user/update`}>
                                    <a>Update Profile</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default AdminIndex;
