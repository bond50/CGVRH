import useCreate from "../../hooks/useCreate";
import CreateForm from "../reusables/forms/CreateForm";
import Alert from "../messages/Alert";
import SideCatTags from "../reusables/forms/side-cat-tags";
import React from "react";

const PageCreate = () => {
    const {
        showCategories,
        handleBody,
        handleChange,
        publish,
        getFeaturedServices,
        error,
        success,
        title,
        body
    } = useCreate('page', 'page-cats', null, 'page')

    return (
        <div className='row'>
            <div className="col-md-8">
                <CreateForm
                    handleChange={handleChange('title')}
                    handleBody={handleBody}
                    bodyValue={body}
                    btnCapture={'Publish'}
                    titleValue={title}
                    onSubmit={publish}/>
                <div className="mb-3">
                    <br/>
                    <Alert msg={error} type="danger" label="Danger"/>
                    <Alert msg={success} label='Success' type='success'/>
                </div>
            </div>
            <div className="col-md-4">
                <SideCatTags
                    categories={showCategories}
                    handleChange={handleChange}/>
            </div>
        </div>
    );
};

export default PageCreate;