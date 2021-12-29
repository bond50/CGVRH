import React from 'react';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import Layout from "../../../hoc/admin/layout/layout";

const Blog = () => {
    return (
        <Layout pageTitle='Create a new blog'>
            <Admin>
                <BlogCreate/>
            </Admin>
        </Layout>
    );
};

export default Blog;