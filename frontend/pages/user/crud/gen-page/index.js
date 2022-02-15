import React from 'react';
import PageCreate from '../../../../components/crud/PageCreate';
import Layout from "../../../../hoc/admin/layout/layout";
import Private from "../../../../components/auth/Private";

const Blog = () => {
    return (
        <Layout pageTitle='Create a new page'>
            <Private>
                <PageCreate/>
            </Private>
        </Layout>
    );
};

export default Blog;