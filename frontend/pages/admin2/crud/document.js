import React from 'react';
import dynamic from "next/dynamic";

const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false });
const DocumentUpload = dynamic(() => import('../../../components/crud/document-upload'), { ssr: false });
const Layout = dynamic(() => import('../../../hoc/admin/layout/layout'), { ssr: false });


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <h2>Upload new document(s)</h2>
                <DocumentUpload/>
            </Admin>
        </Layout>
    );
};

export default Blog;