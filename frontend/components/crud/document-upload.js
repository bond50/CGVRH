import React from 'react';

import SideCatTags from "../reusables/forms/side-cat-tags";
import useUpload from "../../hooks/useUpload";
import UploadForm from "../reusables/forms/upload-form";


const DocumentUpload = () => {
    const {
        showCategories,
        showTags,
        loading,
        title,
        error,
        successMessage,
        UploadMultipleFiles,
        handleChange,
        MultipleFileChange
    } = useUpload()


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <UploadForm
                        handleMultipleFile={MultipleFileChange}
                        loading={loading}
                        handleChange={handleChange}
                        title={title}
                        btnClick={UploadMultipleFiles}
                        error={error}
                        successMessage={successMessage}/>
                </div>

                <SideCatTags categories={showCategories} tags={showTags}/>
            </div>
        </div>
    );
};

export default DocumentUpload;