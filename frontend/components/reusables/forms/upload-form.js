import React from 'react';
import Alert from "../../messages/Alert";
import Button from "../ui/Button";

const UploadForm = ({successMessage, error, title, handleChange, handleMultipleFile, loading, btnClick}) => {
    let btnText = 'Upload'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Uploading...</>
    }


    return (
        <form>
            <div className='mb-3'>
                <Alert msg={successMessage} type="success" label="Success"/>
                <Alert msg={error} type="danger" label="Danger"/>
            </div>
            <div className="input-group mb-3">
                <input
                    value={title}
                    required
                    onChange={handleChange('title')}
                    type="text"
                    className="form-control" placeholder="Enter a tag/title for the file(s)"/>
            </div>

            <div className="input-group mb-3">
                <input
                    required
                    className="form-control"
                    onChange={handleMultipleFile}
                    type="file" multiple/>
            </div>
            <Button
                clicked={btnClick}
                btnCapture={btnText}
                loading={loading}/>
        </form>
    );
};

export default UploadForm;