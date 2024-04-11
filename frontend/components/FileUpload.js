import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {getCookie} from "../actions/auth";
import {API} from "../config";



const FileUpload = ({values, setValues, setLoading, folder, loading}) => {

    const token = getCookie('token');


    function fileUploadAndResize(e) {
        e.preventDefault()
        let allUploadedFiles = values.images
        let files = e.target.files
        if (files) {
            setLoading(true)
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (uri) => {
                        axios.post(`${API}/upload-images`, {image: uri, folder}, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        }).then(r => {
                            setLoading(false)
                            allUploadedFiles.push(r.data)
                            setValues({...values, images: allUploadedFiles})

                        }).catch(e => {
                            console.log(e)
                            setLoading(false)
                        });
                    },
                    "base64")
            }

        }

    }

    function removeImage(id) {
        setLoading(true)
        axios.post(`${API}/remove-image`, {public_id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(() => {
                setLoading(false)

                const {images} = values

                let filteredImages = images.filter((image) => {
                    return image.public_id !== id
                })

                setValues({...values, images: filteredImages})


            }
        ).catch(e => {
            console.log(e)
            setLoading(false)
        })


    }

    return (
        <>

            <div className="m-4">
                {
                    values.images && values.images.map(img => {
                        return <div className="d-inline-flex position-relative mx-2"
                                    key={img.public_id}>
                              <span
                                  className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                               <span onClick={() => removeImage(img.public_id)} style={{cursor: 'pointer'}}>
                                   X
                               </span>
                              </span>
                            <img
                                className="rounded-4 shadow-4 img-fluid"
                                src={img.url} alt="Avatar"
                                style={{width: "70px", height: "70px"}}/>
                        </div>
                    })
                }

            </div>
            <div className="mb-3">
                {!loading ?
                    <label className='btn btn-primary'>File upload
                        <input
                            className="form-control"
                            type="file"
                            multiple
                            hidden
                            accept='image/*'
                            onChange={fileUploadAndResize}
                        />
                    </label>
                    : <p>loading</p>}
            </div>

        </>

    )
        ;
};

export default FileUpload;