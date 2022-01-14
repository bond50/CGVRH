import React from 'react';
import Admin from '../../../components/auth/Admin';
import UploadComponent from "../../../components/crud/Upload";
import Layout from "../../../hoc/admin/layout/layout";
import UploadForm from "../../../components/reusables/forms/upload-form";
import useUpload from "../../../hooks/useUpload";


const Upload = () => {
     const {
        loading,
        successMessage,
        error,
        title,
        handleChange,
        multipleFileChange,
        uploadMultipleFiles
    } = useUpload('gallery')

    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                         <div className="col-md-8 text-muted">
                            <p>Files uploaded hear will appear under <strong>Gallery section</strong></p>
                            <p>Do not upload <strong>Documents</strong> here</p>
                        </div>
                        <div className="col-md-8">
                            <UploadForm
                                title={title}
                                handleChange={handleChange}
                                error={error}
                                successMessage={successMessage}
                                btnClick={uploadMultipleFiles}
                                handleMultipleFile={multipleFileChange}
                                loading={loading}/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Upload;