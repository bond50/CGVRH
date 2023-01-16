import React, {useState} from 'react';
import UploadForm from "../../components/reusables/forms/upload-form";
import useUpload from "../../hooks/useUpload";
import SideCatTags from "../../components/reusables/forms/side-cat-tags";
import {getCookie, isAuth} from "../../actions/auth";
import Alert from "../messages/Alert";
import Button from "../reusables/ui/Button";
import useFCT from "../../hooks/useFCT";
import axiosInstance from "../../axios/axios";
import Card from "../blog/Card";
import axios from "axios";
import {API} from "../../config";


const UploadImages = () => {
    const token = getCookie('token');
    let endpoint
    if (isAuth() && isAuth().role === 1) {
        endpoint = `/gallery-create`
    } else if (isAuth() && isAuth().role === 0) {
        endpoint = `/user/gallery-create`
    }
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        images: [],
        title: ''
    })

    const [checkedTag, setCheckedTag] = useState([]);
    const [successMsg, setSuccessMsg] = useState('')
    const [error, setError] = useState('')
    const {data: loadedTags, error: tagError} = useFCT('gallery-tags')

    const handleChange = e => {
        setValues({...values, title: e.target.value})
    }


    const handleTagsToggle = tag => {
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
    };


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


    const handleSubmit = (e) => {
        setLoading(true)
        setError('')
        const formData = {
            ...values,
            checkedTag
        }


        axiosInstance.post(endpoint, formData)
            .then(response => {
                setValues({
                    ...values,
                    images: [],
                    title: '',
                })
                setLoading(false)
                setError('')
                setCheckedTag([])
                setSuccessMsg(response.data.message)
                 setTimeout(
                    function () {
                        window.location.reload()
                    },
                    3000
                );

            })
            .catch((error) => {

                setError(error.response.data.error)
                setLoading(false)
            });

    };

    const removeImage = (id) => {
        setLoading(true)
        axios.post(`${API}/remove-image`, {public_id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((r) => {
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
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-8 ">
                    <h3>Image upload section</h3>
                    <p>Files uploaded hear will appear under <strong>Gallery section</strong></p>
                    <p>Do not upload <strong>Documents</strong> here</p>
                    <form>
                        <div className='mb-3'>
                            <Alert msg={successMsg} type="success" label="Success"/>
                            <Alert msg={error} type="danger" label="Danger"/>
                        </div>
                        <div className="input-group mb-3">
                            <input
                                value={values.title}
                                required
                                onChange={handleChange}
                                type="text"
                                className="form-control" placeholder="Enter name for the file(s)"/>
                        </div>

                        <Button
                            clicked={handleSubmit}
                            btnCapture='Upload'
                            title={values.title}
                            images={values.images}
                            loading={loading}/>
                    </form>

                    <div className="row gy-3">
                        {
                            values.images && values.images.map(img => {
                                return <div className="col-lg-3"
                                            key={img.public_id}>
                                    <Card
                                        admin={true}
                                        blogUploadSrc={img.url}
                                        blogUploadTitle={values.title}
                                        removeImageByAdmin={() => removeImage(img.public_id)}/>

                                </div>
                            })
                        }

                    </div>
                </div>
                <div className="col-md-4">
                    <SideCatTags
                        tags={showTags}
                        loading={loading}
                        setLoading={setLoading}
                        setValues={setValues}
                        values={values}
                        folder='gallery'/>
                </div>
            </div>
        </div>

    );
};

export default UploadImages;