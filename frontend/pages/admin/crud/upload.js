import React from 'react';
import Admin from '../../../components/auth/Admin';
import UploadComponent from "../../../components/crud/Upload";
import Layout from "../../../hoc/admin/layout/layout";


const Upload = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Upload Images/Files</h2>
                        </div>
                        <div className="col-md-12">
                            <UploadComponent/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Upload;