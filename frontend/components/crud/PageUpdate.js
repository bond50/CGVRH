import React, {useEffect, useState} from 'react';
import SideCatTags from "../reusables/forms/side-cat-tags";
import {API} from "../../config";
import Router, {useRouter} from "next/router";
import Alert from "../messages/Alert";
import CreateForm from "../reusables/forms/CreateForm";
import {getCookie, isAuth} from "../../actions/auth";
import {singlePage} from "../../actions/general";
import {getCategories} from "../../actions/category";
import Card from "../blog/Card";
import axios from "axios";


const Page = () => {
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [isAccepted, setIsAccepted] = useState(false); // switch
    const [isFeatured, setIsFeatured] = useState(false); // switch


    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        images: [],
        formData: process.browser && new FormData(),

    });

    const {error, success, formData, title} = values;
    const token = getCookie('token');
    const router = useRouter()

    useEffect(() => {
        setValues({...values, formData: new FormData()});
        initPage();
        initCategories();
        setValues({...values, formData: new FormData()});
    }, [router]);


    const initPage = () => {
        if (router.query.slug) {
            singlePage(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({...values, title: data.title, images: data.images.includes('') ? [] : data.images});
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
        pageCategories.map((c) => {
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


    const editPage = e => {
        e.preventDefault();
        setLoading(true)
        let updateEndpoint

        if (isAuth() && isAuth().role === 1) {
            updateEndpoint = `${API}/general/${router.query.slug}`

        } else if (isAuth() && isAuth().role === 0) {
            updateEndpoint = `${API}/user/general/${router.query.slug}`
        }


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
        };

        axios.put(updateEndpoint, bodyParameters, config).then((res) => {
            setValues({
                ...values,
                title: '',
                error: '',
                images: [],
                success: `A new item titled "${res.data.title}" is updated`
            });
            setBody('');
            setLoading(false)
            setTimeout(() => {
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin2/gencrud/${router.query.slug}`);
                    Router.replace(`/admin2`).then(r => console.log(r));
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`).then(r => console.log(r));
                }
            }, 3000)

        })
            .catch((error) => {
                 setLoading(false)
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
        // updatePage(formData, token, router.query.slug)
        //     .then(data => {
        //         if (data.error) {
        //             setValues({...values, error: data.error});
        //         } else {
        //             setValues({...values, title: '', success: `Blog titled "${data.title}" is successfully updated`});
        //             if (isAuth() && isAuth().role === 1) {
        //                 // Router.replace(`/admin2/crud/${router.query.slug}`).then(r => console.log(r));
        //                 Router.replace(`/admin2`).then(r => (console.log(r)));
        //             } else if (isAuth() && isAuth().role === 0) {
        //                 // Router.replace(`/user/crud/gen-page/${router.query.slug}`).then(r => console.log(r));
        //                 Router.replace(`/user`).then(r => (console.log(r)));
        //             }
        //         }
        //     });
    };


    const onSwitchToggle = e => {
        setIsAccepted(!isAccepted)
        formData.set('accepted', e.target.checked);
    };

    const onSwitchFeaturedToggle = e => {
        setIsFeatured(!isFeatured)
        formData.set('featured', e.target.checked);
    };
    const removeImage = (id) => {
        setLoading(true)
        axios.post(`${API}/remove-image`, {public_id: id}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then((r) => {
            console.log(r)
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
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Accept </label>
                        </div>
                        }
                        {isAccepted && isAuth() && isAuth().role === 0 &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Accepted <i
                                className="bi bi-check2-circle text-success "/>
                            </label>
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
                        </div>}
                        {isAuth() && isAuth().role === 0 && isFeatured &&
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Featured <i
                                className="bi bi-check2-circle text-success "/>
                            </label>
                        }

                        <br/>
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
                    onSubmit={editPage}/>
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
                    categories={showCategories}
                    setLoading={setLoading}
                    setValues={setValues}
                    loading={loading}
                    folder='vihiga-service'
                    values={values}
                    handleChange={handleChange}/>
            </div>
        </div>


    )
        ;
};

export default Page;