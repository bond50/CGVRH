import React from 'react';
import SideCatTags from "../reusables/forms/side-cat-tags";
import Image from "next/image";
import {API} from "../../config";
import {useRouter} from "next/router";
import Alert from "../messages/Alert";
import CreateForm from "../reusables/forms/CreateForm";


const BlogUpdate = ({
                        handleChange,
                        handleBody,
                        body,
                        title,
                        editBlog,
                        error,
                        success,
                        showTags,
                        showCategories,
                        changed,
                        isToggled

                    }) => {
    const router = useRouter()


    return (
        <div className='row'>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Update <span>| {router.query.slug}</span></h5>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isToggled}
                                onChange={changed}
                                id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">ACCEPT</label>
                        </div>
                    </div>
                </div>

                <CreateForm
                    handleChange={handleChange('title')}
                    handleBody={handleBody}
                    bodyValue={body}
                    btnCapture={'Update'}
                    titleValue={title}
                    onSubmit={editBlog}/>
                <div className="mb-3">
                    <br/>
                    <Alert msg={error} type="danger" label="Danger"/>
                    <Alert msg={success} label='Success' type='success'/>
                </div>
                {body && (
                    <Image src={`${API}/blog/photo/${router.query.slug}`} alt={title} width={800} height={500}/>
                )}
            </div>
            <div className="col-md-4">
                <SideCatTags
                    tags={showTags}
                    categories={showCategories}
                    handleChange={handleChange}/>
            </div>
        </div>


    );
};

export default BlogUpdate;