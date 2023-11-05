import React from 'react';
import Admin from "../../../../components/auth/Admin";
import Layout from "../../../../hoc/admin/layout/layout";
import TenderUpdate from "../../../../components/crud/tender-update";

const Tender = () => {
    return (
        <Layout pageTitle='Update Tender'>
            <Admin>
                <TenderUpdate/>
            </Admin>
        </Layout>
    );
};

export default Tender;