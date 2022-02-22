import React from 'react';
import Layout from "../../../../hoc/admin/layout/layout";
import Admin from "../../../../components/auth/Admin";
import PageCategory from "../../../../components/crud/page-category";


const Category = () => {
    return (
        <Layout pageTitle='Manage categories and Tags'>
            <Admin>
                <PageCategory/>
            </Admin>
        </Layout>
    )
};

export default Category;

