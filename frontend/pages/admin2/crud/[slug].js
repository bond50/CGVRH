import React from 'react';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false });
const BlogUpdate = dynamic(() => import('../../../components/crud/BlogUpdate'), { ssr: false });
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false });

const Slug = () => {
    return (
        <Layout>
            <Admin>
                <BlogUpdate />
            </Admin>
        </Layout>
    );
};

export default Slug;
