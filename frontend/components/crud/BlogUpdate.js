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


const BlogUpdate = () => {
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [isAccepted, setIsAccepted] = useState(false); // switch
    const [isFeatured, setIsFeatured] = useState(false); // switch


    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: process.browser && new FormData(),
        loading: false
    });

    const {error, success, formData, title} = values;
    const token = getCookie('token');
    const router = useRouter()

    useEffect(() => {
        let isMounted = true;
        setValues({...values, formData: new FormData()});
        initBlog();
        initCategories();
        initTags();
        setValues({...values, formData: new FormData()});
        return () => {
            isMounted = false;
        };
    }, [router]);


    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({...values, title: data.title});
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
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        blogTags.map((t, i) => {
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


    const editBlog = e => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({...values, title: '', success: `Blog titled "${data.title}" is successfully updated`});

                    if (isAuth() && isAuth().role === 1) {
                        Router.replace(`/admin2/crud/${router.query.slug}`);
                        // Router.replace(`/admin2`).then(r => console.log(r));
                    } else if (isAuth() && isAuth().role === 0) {
                        Router.replace(`/user/crud/${router.query.slug}`);
                        // Router.replace(`/user`).then(r => console.log(r));
                    }
                }
            });
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