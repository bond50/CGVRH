import useCreate from "../../hooks/useCreate";
import CreateForm from "../reusables/forms/CreateForm";
import Alert from "../messages/Alert";
import SideCatTags from "../reusables/forms/side-cat-tags";
import React from "react";
import Card from "../blog/Card";
import axios from "axios";
import {getCookie, isAuth} from "../../actions/auth";
import {API} from "../../config";


const CreateBlog = () => {
    const {
        showCategories,
        showTags,
        handleBody,
        handleChange,
        loading,
        setLoading,
        removeImage,
        error,
        success,
        title,
        values,
        images,
        formData,
        setBody,
        checked: categories,
        checkedTag: tags,
        setValues,
        body
    } = useCreate('blog', 'categories', 'tags', 'blog')
    let blogEndpoint

    if (isAuth() && isAuth().role === 1) {
        blogEndpoint = `${API}/blog`
    } else if (isAuth() && isAuth().role === 0) {
        blogEndpoint = `${API}/user/blog`
    }

    const token = getCookie('token');
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const bodyParameters = {categories, body, title, images, tags};

        axios.post(blogEndpoint, bodyParameters, config).then((res) => {
            setValues({
                ...values,
                title: '',
                error: '',
                images: [],
                success: `A new item titled "${res.data.title}" is created`
            });
            setBody('');
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 3000)

        })
            .catch((error) => {
                setLoading(false)
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setValues({...values, error: error.response.data.error});
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

    };


    return (
        <div className='row'>
            <div className="col-md-8">
                <CreateForm
                    handleChange={handleChange('title')}
                    handleBody={handleBody}
                    bodyValue={body}
                    loading={loading}
                    btnCapture={'Publish'}
                    titleValue={title}
                    onSubmit={handleSubmit}/>
                <div className="mb-3">
                    <br/>
                    <Alert msg={error} type="danger" label="Danger"/>
                    <Alert msg={success} label='Success' type='success'/>
                </div>

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
                    values={values}
                    folder='vihiga-blog'
                    loading={loading}
                    formData={formData}
                    setLoading={setLoading}
                    setValues={setValues}
                    categories={showCategories}
                    handleChange={handleChange}/>
            </div>
        </div>
    );
};

export default CreateBlog