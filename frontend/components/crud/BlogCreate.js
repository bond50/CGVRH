import React, {useState, useEffect} from 'react';
import {withRouter} from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {createBlog} from '../../actions/blog';
import {dataFromLocalStorage, setDataToLocalStorage} from '../reusables/functions/dataFromLocalStorage'

import Alert from "../messages/Alert";
import BlogForm from "../reusables/forms/CreateForm";

const CreateBlog = ({router}) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [body, setBody] = useState(dataFromLocalStorage("blog"));
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: {},
        title: '',
        hidePublishButton: false
    });

    const {error, sizeError, success, formData, title, hidePublishButton} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initCategories();
        initTags();
    }, [router]);

    const initCategories = () => {
        getCategories('categories').then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags('tags').then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setTags(data);
            }
        });
    };

    const publishBlog = e => {
        e.preventDefault();
        // console.log('ready to publishBlog');
        createBlog(formData, token).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" is created`});
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});

    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
        setDataToLocalStorage('blog', e)
    };

    const handleToggle = c => () => {
        setValues({...values, error: ''});
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTagsToggle = tag => {
        setValues({...values, error: ''});
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(tag);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
        console.log(all)

        formData.set('tags', all);

    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="form-check-input me-1"/>
                    {c.name}
                </label>
            ))
        );
    };

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={() => handleTagsToggle(t._id)} type="checkbox" className="form-check-input me-1"/>
                    {t.name}
                </label>
            ))
        );
    };


    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    <BlogForm
                        handleChange={handleChange('title')}
                        handleBody={handleBody}
                        bodyValue={body}
                        btnCapture='Publish'
                        titleValue={title}
                        onSubmit={publishBlog}/>
                    <div className="mb-3">
                        <br/>
                        <Alert msg={error} type="danger" label="Danger"/>
                        <Alert msg={success} label='Success' type='success'/>
                    </div>
                </div>

                <div className="col-md-4">
                    <div>
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
                    </div>
                    <div className='mb-3'>
                        <h5>Categories</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}}
                             className='list-group list-group-flush'>{showCategories()}</div>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr/>
                        <div style={{maxHeight: '200px', overflowY: 'auto'}}
                             className='list-group list-group-flush'>{showTags()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(CreateBlog);