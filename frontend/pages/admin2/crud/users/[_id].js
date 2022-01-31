import Layout from "../../../../hoc/admin/layout/layout";
import Admin from "../../../../components/auth/Admin";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axiosInstance from "../../../../axios/axios";
import {API} from "../../../../config";
import Alert from "../../../../components/messages/Alert";

import {getCookie,} from "../../../../actions/auth";
import {updateForAdmin} from "../../../../actions/user";
import Image from "next/image";
import classes from "../../../../styles/Userprofile.module.css";
import {Tab, Tabs} from "react-bootstrap";
import Overview from "../../../../components/profile/overview";
import Profile from "../../../../components/profile/profile";
import ChangePassword from "../../../../components/profile/change-password";
import Link from "next/link";


const Slug = () => {
    const [key, setKey] = useState('overview');
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        about: '',
        password: '',
        error: '',
        success: false,
        loading: false,
        photo: '',
        designation: '',
        twitter: '',
        facebook: '',
        linkedIn: '',
        instagram: '',
        reload: false,
        hmt: false,
        userData: process.browser && new FormData()
    });

    const router = useRouter()

    const init = () => {
        axiosInstance.get(`${API}/single-user/${router.query._id}`)
            .then(res => {
                setValues({
                    ...values,
                    username: res.data.username,
                    username_for_photo: res.data.username,
                    name: res.data.name,
                    email: res.data.email,
                    about: res.data.about,
                    role: res.data.role,
                    address: res.data.address,
                    designation: res.data.designation,
                    twitter: res.data.twitter,
                    facebook: res.data.facebook,
                    linkedIn: res.data.linkedIn,
                    instagram: res.data.instagram,
                    hmt: res.data.hmt,
                });

            });
    };


    const token = getCookie('token');
    const {
        username,
        username_for_photo,
        name,
        about,
        password,
        address,
        designation,
        error,
        success,
        loading,
        twitter,
        facebook,
        linkedIn,
        instagram,
        hmt,
        reload,
        userData
    } = values;
    useEffect(() => {
        setValues({...values, userData: new FormData()});
        init();

    }, [router.query._id, reload]);


    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        userData.set(name, value);

        setValues({...values, [name]: value, userData, error: false, success: false});
    };


    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true, success: false});
        updateForAdmin(token, userData, router.query._id).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {

                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                    address: data.address,
                    designation: data.designation,
                    twitter: data.twitter,
                    facebook: data.facebook,
                    linkedIn: data.linkedIn,
                    instagram: data.instagram,
                    password: '',
                    success: true,
                    hmt: data.hmt,
                    loading: false,
                    reload: !reload
                });

            }
        });

    };

    let btnText = 'Save changes'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> loading...</>
    }

    const showSuccessMessage = () => success && <div>
        <Alert msg="Profile Updated " label='Success' type='success'/>
    </div>


    const showErrorMessage = () => (
        <Alert msg={error} type="danger" label="Danger"/>
    );

    function handleCheckBox(e) {
        const value = e.target.checked;
        userData.set('hmt', value);
        setValues({...values, hmt: value, userData, error: false, success: false});

    }

    return (
        <Layout>
            <Admin>
                <section>
                    <div className="row">
                        <div className="col-xl-4">
                            <div className={`card ${classes.Card} `}>
                                <div
                                    className={`card-body ${classes.CardBody} pt-4 d-flex flex-column align-items-center`}>
                                    {username_for_photo && <Image
                                        width={256}
                                        height={171}
                                        src={`${API}/user/photo/${username_for_photo}`}
                                        className="img-fluid"
                                        alt="user profile"
                                    />}
                                    <h2>{name}</h2>
                                    <h3>{designation ? designation : "Designation not available"}</h3>
                                    <div className={`${classes.Links} mt-2`}>
                                        {twitter &&
                                            <Link href={twitter}>
                                                <a className="twitter"><i className="bi bi-twitter"/></a>
                                            </Link>
                                        }
                                        {
                                            facebook &&
                                            <Link href={facebook}>
                                                <a className="facebook"><i className="bi bi-facebook"/></a>
                                            </Link>

                                        }
                                        {
                                            instagram &&
                                            <Link href={instagram}>
                                                <a className="instagram"><i
                                                    className="bi bi-instagram"/>
                                                </a>
                                            </Link>
                                        }
                                        {linkedIn &&
                                            <Link href={linkedIn}>
                                                <a className="linkedin"><i className="bi bi-linkedin"/></a>
                                            </Link>

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className={`card ${classes.Card}`}>
                                <div className={`card-body ${classes.CardBody}`}>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                    >
                                        <Tab eventKey="overview" title="Overview">
                                            <Overview
                                                name={name}
                                                address={address}
                                                username={username}
                                                hmt={hmt}
                                                about={about}
                                                designation={designation}/>
                                        </Tab>
                                        <Tab eventKey="profile" title="Profile">
                                            <Profile
                                                handleCheckBox={handleCheckBox}
                                                username_for_photo={username_for_photo}
                                                username={username}
                                                about={about}
                                                name={name}
                                                successMsg={showSuccessMessage}
                                                password={password}
                                                loading={loading}
                                                designation={designation}
                                                handleChange={handleChange}
                                                handleSubmit={handleSubmit}
                                                errorMsg={showErrorMessage}
                                                btnText={btnText}
                                                instagram={instagram}
                                                twitter={twitter}
                                                facebook={facebook}
                                                linkedIn={linkedIn}
                                                address={address}
                                                hmt={hmt}
                                            />
                                        </Tab>
                                        <Tab eventKey="password" title="Change Password" disabled>
                                            <ChangePassword/>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Admin>
        </Layout>
    );
};

export default Slug;