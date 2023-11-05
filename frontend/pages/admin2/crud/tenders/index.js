import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import TenderRead from "../../../../components/crud/tender-read";


const Upload = () => {
    return (
        <Layout pageTitle='Manage Tenders'>
            <Admin>
                <TenderRead/>
            </Admin>
        </Layout>
    );
};

export default Upload;