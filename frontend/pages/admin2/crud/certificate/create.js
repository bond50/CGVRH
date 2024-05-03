import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import CertCreate from '../../../../components/crud/certificate/CertCreate';


const Upload = () => {
    return (
        <Layout pageTitle='Generate a New Certificate'>
            <Admin>
                <CertCreate/>
            </Admin>
        </Layout>
    );
};

export default Upload;