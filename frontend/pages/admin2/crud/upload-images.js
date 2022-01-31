import React, {useEffect, useState} from 'react';
import Admin from '../../../components/auth/Admin';
import Layout from "../../../hoc/admin/layout/layout";
import UploadForm from "../../../components/reusables/forms/upload-form";
import useUpload from "../../../hooks/useUpload";
import useFCT from "../../../hooks/useFCT";
import SideCatTags from "../../../components/reusables/forms/side-cat-tags";


const Upload = () => {

    const {
        loading,
        successMessage,
        error,
        title,
        loadedTags,
        handleTagsToggle,
        handleChange,
        multipleFileChange,
        uploadMultipleFiles
    } = useUpload('gallery','gallery-tags','gallery-create')




    const showTags = () => {
        return (
            loadedTags && loadedTags.map((t, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={() => handleTagsToggle(t._id)} type="checkbox"
                           className="form-check-input me-1"/>
                    {t.name}
                </label>
            ))
        );
    };


    return (
        <Layout>
            <Admin>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-8 ">
                            <h3>Image upload section</h3>
                            <p>Files uploaded hear will appear under <strong>Gallery section</strong></p>
                            <p>Do not upload <strong>Documents</strong> here</p>
                            <UploadForm
                                title={title}
                                handleChange={handleChange}
                                error={error}
                                successMessage={successMessage}
                                btnClick={uploadMultipleFiles}
                                handleMultipleFile={multipleFileChange}
                                loading={loading}/>
                        </div>
                        <div className="col-md-4">
                            <SideCatTags
                                tags={showTags}/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Upload;