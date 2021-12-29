import React from 'react';
import Layout from '../../../hoc/Layout';
import Admin from '../../../components/auth/Admin';
import DocumentUpload from '../../../components/crud/document-upload';

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