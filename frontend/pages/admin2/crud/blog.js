import React from 'react';
import dynamic from 'next/dynamic';
const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false });
const BlogCreate = dynamic(() => import('../../../components/crud/BlogCreate'), { ssr: false });
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false });


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