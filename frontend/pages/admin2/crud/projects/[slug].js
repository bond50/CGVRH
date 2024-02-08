import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import ProjectUpdate from "../../../../components/crud/project-update";


const Upload = () => {
    return (
        <Layout pageTitle='Update project'>
            <Admin>
                <ProjectUpdate/>
            </Admin>
        </Layout>
    );
};

export default Upload;