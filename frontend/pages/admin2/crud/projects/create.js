import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import ProjectCreate from "../../../../components/crud/project-create";


const Upload = () => {
    return (
        <Layout pageTitle='Add A project'>
            <Admin>
                <ProjectCreate/>
            </Admin>
        </Layout>
    );
};

export default Upload;