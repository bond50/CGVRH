import React from 'react';
import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import ProjectRead from "../../../../components/crud/project-read";


const Upload = () => {
    return (
        <Layout pageTitle='Manage projects'>
            <Admin>
                <ProjectRead/>
            </Admin>
        </Layout>
    );
};

export default Upload;