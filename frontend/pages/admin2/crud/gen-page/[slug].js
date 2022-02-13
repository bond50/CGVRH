import Admin from "../../../../components/auth/Admin";
import PageUpdate from "../../../../components/crud/PageUpdate";
import Layout from "../../../../hoc/admin/layout/layout";
import React, {useEffect, useState,} from "react";
import {getCookie, isAuth} from "../../../../actions/auth";
import Router, {useRouter} from "next/router";
import {getCategories} from "../../../../actions/category";
import {singlePage, updatePage} from "../../../../actions/general";


const Slug = () => {
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [isAccepted, setIsAccepted] = useState(false); // switch
    const [isFeatured, setIsFeatured] = useState(false); // switch


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
        initPage();
        initCategories();
        setValues({...values, formData: new FormData()});
        return () => {
            isMounted = false;
        };
    }, [router]);


    const initPage = () => {
        if (router.query.slug) {
            singlePage(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data)
                    setValues({...values, title: data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setIsAccepted(data.accepted)
                    setIsFeatured(data.featured)
                }
            });
        }
    };


    const setCategoriesArray = pageCategories => {
        let ca = [];
        pageCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };


    const initCategories = () => {
        getCategories('page-cats').then(data => {
            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setCategories(data);
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

    const findOutCategory = c => {
        const result = checked.indexOf(c);
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
        updatePage(formData, token, router.query.slug).then(data => {
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


    const onSwitchToggle = e => {
        setIsAccepted(!isAccepted)
        formData.set('accepted', e.target.checked);
    };

     const onSwitchFeaturedToggle =  e => {
        setIsFeatured(!isFeatured)
        formData.set('featured', e.target.checked);
    };

    return (
        <Layout>
            <Admin>
                <PageUpdate
                    isFeatured={isFeatured}
                    featuredChanged={onSwitchFeaturedToggle}
                    handleChange={handleChange}
                    showCategories={showCategories}
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