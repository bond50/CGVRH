import React from 'react';
import UploadForm from "../../components/reusables/forms/upload-form";
import useUpload from "../../hooks/useUpload";
import SideCatTags from "../../components/reusables/forms/side-cat-tags";
import {isAuth} from "../../actions/auth";


const UploadImages = () => {
        let endpoint
    if (isAuth() && isAuth().role === 1) {
        endpoint = `/gallery-create`
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `/user/gallery-create`
    }


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
    } = useUpload('gallery', 'gallery-tags', endpoint)


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

    );
};

export default UploadImages;