import useCreate from "../../hooks/useCreate";
import CreateForm from "../reusables/forms/CreateForm";
import Alert from "../messages/Alert";
import SideCatTags from "../reusables/forms/side-cat-tags";
import React from "react";
import Card from "../blog/Card";

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
        keywords,
        formData,
        setValues,
        body,
        publish,
        postToSocialMedia,
        setPostToSocialMedia
    } = useCreate('blog', 'categories', 'tags', 'blog');

    return (
        <div className='row'>
            <div className="col-md-8">
                <CreateForm
                    handleChange={handleChange}
                    handleBody={handleBody}
                    bodyValue={body}
                    loading={loading}
                    btnCapture={'Publish'}
                    keywordsValue={keywords}
                    titleValue={title}
                    onSubmit={publish}
                    postToSocialMedia={postToSocialMedia}
                    setPostToSocialMedia={setPostToSocialMedia}
                />
                <div className="mb-3">
                    <br />
                    <Alert msg={error} type="danger" label="Danger" />
                    <Alert msg={success} label='Success' type='success' />
                </div>

                <div className="row gy-3">
                    {
                        values.images && values.images.map(img => (
                            <div className="col-lg-3" key={img.public_id}>
                                <Card
                                    admin={true}
                                    blogUploadSrc={img.url}
                                    blogUploadTitle={values.title}
                                    removeImageByAdmin={() => removeImage(img.public_id)} />
                            </div>
                        ))
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
                    handleChange={handleChange} />
            </div>
        </div>
    );
};

export default CreateBlog;
