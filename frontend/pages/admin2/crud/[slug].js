import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Layout from "../../../hoc/admin/layout/layout";
import React, {useEffect, useState,} from "react";
import {getCookie, isAuth} from "../../../actions/auth";
import Router, {useRouter} from "next/router";
import {singleBlog, updateBlog} from "../../../actions/blog";
import {getCategories} from "../../../actions/category";
import {getTags} from "../../../actions/tag";


const Slug = () => {
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags
    const [isAccepted, setIsAccepted] = useState(false); // switch


    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: process.browser && new FormData(),
        loading: false
    });

    const {error, success, formData, title, status} = values;
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
            console.log(router.query.slug)
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({...values, title: data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                    setIsAccepted(data.accepted)
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
        updateBlog(formData, token, router.query.slug).then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({...values, title: '', success: `Blog titled "${data.title}" is successfully updated`});
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin2/crud/${router.query.slug}`);
                    Router.replace(`/admin2`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        });
    };


    const onSwitchToggle = (e) => {
        setIsAccepted(!isAccepted)
        formData.set('accepted', e.target.checked);
    };

    return (
        <Layout>
            <Admin>
                <BlogUpdate
                    handleChange={handleChange}
                    showCategories={showCategories}
                    showTags={showTags}
                    body={body}
                    title={title}
                    editBlog={editBlog}
                    handleBody={handleBody}
                    error={error}
                    status={status}
                    isToggled={isAccepted}
                    changed={onSwitchToggle}
                    success={success}/>
            </Admin>
        </Layout>
    );
};

export default Slug;