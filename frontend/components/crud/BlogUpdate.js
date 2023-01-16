import React, {useEffect, useState} from 'react';
import SideCatTags from "../reusables/forms/side-cat-tags";
import Image from "next/image";
import {API} from "../../config";
import Router, {useRouter} from "next/router";
import Alert from "../messages/Alert";
import CreateForm from "../reusables/forms/CreateForm";
import {getCookie, isAuth} from "../../actions/auth";
import {singleBlog, updateBlog} from "../../actions/blog";
import {getCategories} from "../../actions/category";
import {getTags} from "../../actions/tag";
import Card from "../blog/Card";
import useCreate from "../../hooks/useCreate";
import axios from "axios";


const BlogUpdate = () => {
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [isAccepted, setIsAccepted] = useState(false); // switch
    const [isFeatured, setIsFeatured] = useState(false); // switch


    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        images: [],
        formData: process.browser && new FormData(),
    });

    const {error, success, formData, images, title} = values;
    const token = getCookie('token');
    const router = useRouter()

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initBlog();
        initCategories();
        initTags();
        setValues({...values, formData: new FormData()});

    }, [router]);

    let updateBlogEndpoint

    if (isAuth() && isAuth().role === 1) {
        updateBlogEndpoint = `${API}/blog/${router.query.slug}`

    } else if (isAuth() && isAuth().role === 0) {
        updateBlogEndpoint = `${API}/user/blog/${router.query.slug}`
    }

    console.log('Main', values)

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data)
                    console.log(data.images)
                    setValues({...values, title: data.title, images: data.images.includes('') ? [] : data.images});
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                    setIsAccepted(data.accepted)
                    setIsFeatured(data.featured)
                }
            });
        }
    };


    const setCategoriesArray = blogCategories => {
        let ca = [];
        blogCategories.map((c) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        blogTags.map((t) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };

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

    const handleTagsToggle = t => () => {
        setValues({...values, error: ''});
        // return the first index or -1
        const clickedTag = checkedTag.indexOf(t);
        const all = [...checkedTag];

        if (clickedTag === -1) {
            all.push(t);
        } else {
            all.splice(clickedTag, 1);
        }
        setCheckedTag(all);
        formData.set('tags', all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        return result !== -1;
    };

    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        return result !== -1;
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (

                <label key={i} className="list-group-item border-0">
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)} type="checkbox"
                           className="form-check-input me-1"/>
                    {c.name}
                </label>

            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <label key={i} className="list-group-item border-0">
                    <input onChange={handleTagsToggle(t._id)} checked={findOutTag(t._id)} type="checkbox"
                           className="form-check-input me-1"/>
                    {t.name}
                </label>

            ))
        );
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
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

    const editBlog = e => {
        e.preventDefault();

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const bodyParameters = {
            categories: checked,
            featured: isFeatured,
            accepted: isAccepted,
            body,
            title,
            images: values.images,
            tags: checkedTag
        };


        axios.put(updateBlogEndpoint, bodyParameters, config).then((res) => {
            setValues({
                ...values,
                title: '',
                error: '',
                images: [],
                success: `A new item titled "${res.data.title}" is updated`
            });
            setBody('');
            if (isAuth() && isAuth().role === 1) {
                // Router.replace(`/admin2/gencrud/${router.query.slug}`);
                Router.replace(`/admin2`).then(r => console.log(r));
            } else if (isAuth() && isAuth().role === 0) {
                // Router.replace(`/user/crud/${router.query.slug}`);
                Router.replace(`/user`).then(r => console.log(r));
            }

        })
            .catch((error) => {
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

        // updateBlog(formData, token, router.query.slug)
        //     .then(data => {
        //         if (data.error) {
        //             setValues({...values, error: data.error});
        //         } else {
        //             setValues({...values, title: '', success: `Blog titled "${data.title}" is successfully updated`});
        //
        //             if (isAuth() && isAuth().role === 1) {
        //                 // Router.replace(`/admin2/gencrud/${router.query.slug}`);
        //                 Router.replace(`/admin2`).then(r => console.log(r));
        //             } else if (isAuth() && isAuth().role === 0) {
        //                 // Router.replace(`/user/crud/${router.query.slug}`);
        //                 Router.replace(`/user`).then(r => console.log(r));
        //             }
        //         }
        //     });
    };


    const onSwitchToggle = (e) => {
        setIsAccepted(!isAccepted)
        formData.set('accepted', e.target.checked);
    };
    const onSwitchFeaturedToggle = e => {
        setIsFeatured(!isFeatured)
        formData.set('featured', e.target.checked);
    };


    return (
        <div className='row'>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Update <span>| {router.query.slug}</span></h5>
                        {isAuth() && isAuth().role === 1 && <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isAccepted}
                                onChange={onSwitchToggle}
                                id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Accept</label>
                        </div>
                        }
                        {isAccepted && isAuth() && isAuth().role === 0 &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Accepted <i
                                className="bi bi-check2-circle text-success "/></label>
                        }
                        <br/>
                        {isAuth() && isAuth().role === 0 && !isAccepted &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Accepted <i
                                className="bi bi-x-circle-fill text-danger "/>
                            </label>
                        }
                        {isAuth() && isAuth().role === 1 && <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isFeatured}
                                onChange={onSwitchFeaturedToggle}
                                id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Is Featured </label>
                        </div>
                        }

                        {isAuth() && isAuth().role === 0 && isFeatured &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Featured <i
                                className="bi bi-check2-circle text-success "/>
                            </label>
                        }
                        {isAuth() && isAuth().role === 0 && !isFeatured &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Featured <i
                                className="bi bi-x-circle-fill text-danger "/>
                            </label>
                        }
                    </div>
                </div>

                <CreateForm
                    handleChange={handleChange('title')}
                    handleBody={handleBody}
                    bodyValue={body}
                    loading={loading}
                    btnCapture={'Update'}
                    titleValue={title}
                    onSubmit={editBlog}/>
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
                    setValues={setValues}
                    setLoading={setLoading}
                    loading={loading}
                    folder='vihiga-blog'
                    values={values}
                    categories={showCategories}
                    handleChange={handleChange}/>
            </div>
        </div>


    );
};

export default BlogUpdate;