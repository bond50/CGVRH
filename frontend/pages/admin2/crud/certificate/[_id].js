import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import CertUpdate from '../../../../components/crud/certificate/CertUpdate';


const Upload = () => {
    return (
        <Layout pageTitle='Update a certificate'>
            <Admin>
                <CertUpdate/>
            </Admin>
        </Layout>
    );
};

export default Upload;