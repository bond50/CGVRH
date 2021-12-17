import React from "react";
import Layout from "../../hoc/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";


const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className='row'>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Create Category</a>
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Create Tag</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <a href="/admin/crud/blog">Create Blog</a>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/blogs">
                                    <a>Update/Delete Blog</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/user/update">
                                    <a>Update Profile</a>
                                </Link>
                            </li>
                            <li className="list-group-item">
                                <Link href="/admin/crud/upload">
                                    <a>Upload Images </a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/service">
                                    <a>Add a service page</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/service-category-tag">
                                    <a>Create service page</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/service-category-tag">
                                    <a>service page Tag</a>
                                </Link>
                            </li>


                            <li className="list-group-item">
                                <Link href="/admin/crud/services">
                                    <a>Update/Delete Page</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/document-category-tag">
                                    <a>Document tag and cats</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/document">
                                    <a>Upload a document</a>
                                </Link>
                            </li>

                            <li className="list-group-item">
                                <Link href="/admin/crud/document">
                                    <a>Pending Blog Posts (Not approved)</a>
                                </Link>
                            </li>


                        </ul>
                    </div>
                    <div className="col-md-8">
                        <p> Pending Posts</p>
                        <button type="button" className="btn btn-primary mx-2">Approve</button>
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;
