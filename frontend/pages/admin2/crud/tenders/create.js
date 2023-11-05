import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import UploadTenders from "../../../../components/crud/upload-tenders";


const Upload = () => {
    return (
        <Layout pageTitle='Add Tender'>
            <Admin>
                <UploadTenders/>
            </Admin>
        </Layout>
    );
};

export default Upload;