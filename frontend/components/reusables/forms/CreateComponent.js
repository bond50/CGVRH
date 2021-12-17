import React from 'react';

import Alert from "../../messages/Alert";
import CreateForm from "./CreateForm";
import SideCatTags from "./side-cat-tags";

const CreateComponent = ({
                             handleChange,
                             handleBody,
                             body,
                             btnCapture,
                             title,
                             onSubmit,
                             errorAlert,
                             successAlert,
                             categories,
                             tags,
                             featuredServices,
                         }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <CreateForm
                        handleChange={handleChange('title')}
                        handleBody={handleBody}
                        bodyValue={body}
                        btnCapture={btnCapture}
                        titleValue={title}
                        onSubmit={onSubmit}/>
                    <div className="mb-3">
                        <br/>
                        <Alert msg={errorAlert} type="danger" label="Danger"/>
                        <Alert msg={successAlert} label='Success' type='success'/>
                    </div>
                </div>
                <SideCatTags
                    tags={tags}
                    categories={categories}
                    handleChange={handleChange}
                    featuredServices={featuredServices}/>
            </div>
        </div>
    );
};

export default CreateComponent;