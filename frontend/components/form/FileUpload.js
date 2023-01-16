import React, {useState} from 'react';
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {getCookie} from "../../actions/auth";
import {API} from "../../config";


const FileUpload = ({values, setValues, formData, setLoading, loading, folder}) => {


    const token = getCookie('token');

    function fileUploadAndResize(e) {
        e.preventDefault()
        let allUploadedFiles = values.images
        let files = e.target.files
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 1024, 1024, "JPEG", 100, 0, (uri) => {
                        axios.post(`${API}/upload-images`, {folder: folder, image: uri}, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        }).then(r => {
                            setLoading(false)
                            allUploadedFiles.push(r.data)
                            setValues({...values, images: allUploadedFiles})

                        }).catch(e => {
                            setLoading(false)

                            console.log(e)
                        });
                    },
                    "base64")
            }

        }

    }


    return (
        <>
            <div className="mb-3">
                {!loading ?
                    <label className='btn btn-primary'>Select images
                        <input
                            className="form-control"
                            type="file"
                            multiple
                            hidden
                            accept='image/*'
                            onChange={fileUploadAndResize}
                        />
                    </label>
                    : <button className="btn btn-primary" type="button" disabled>

                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Please wait ...!
                    </button>
                }
            </div>

        </>

    )
        ;
};

export default FileUpload;