import React from 'react';

import Alert from "../../messages/Alert";
import CreateForm from "./CreateForm";

const CreateComponent = ({handleChange, handleBody, body, btnCapture, title, onSubmit, errorAlert, successAlert,categories,tags,featuredServices}) => {
    return (
        <div className="container-fluid pb-5">
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

                <div className="col-md-4">
                    <div className="form-group mb-3">
                        <h5>Featured image</h5>
                        <hr/>
                        <small className="text-muted">Max size: 1mb</small>
                        <br/>
                        <label className="btn btn-outline-info">
                            Upload featured image
                            <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
                        </label>
                    </div>
                     <div className='mb-3'>
                        <h5>Nature</h5>
                          <hr/>
                         <div className='list-group list-group-flush'>{featuredServices()}</div>
                    </div>

                    <div className='mb-3'>
                        <h5>Categories</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}}
                             className='list-group list-group-flush'>{categories()}</div>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}}
                             className='list-group list-group-flush'>{tags()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateComponent;