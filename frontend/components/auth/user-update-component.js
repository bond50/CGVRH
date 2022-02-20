import React, {useEffect, useState} from "react";
import axiosInstance from "../../axios/axios";
import {API} from "../../config";
import Alert from "../../components/messages/Alert";
import {getCookie, updateUser,} from "../../actions/auth";
import {updateForAdmin} from "../../actions/user";
import Image from "next/image";
import classes from "../../styles/Userprofile.module.css";
import {Tab, Tabs} from "react-bootstrap";
import Overview from "../../components/profile/overview";
import Profile from "../../components/profile/profile";
import ChangePassword from "../../components/profile/change-password";
import Link from "next/link";

const UserUpdateComponent = ({id}) => {
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
        hmtRole: '',
        hospitalRole: '',
        hmt: false,
        photoDimensions: {},
        userData: process.browser && new FormData()
    });




    const init = () => {
        axiosInstance.get(`${API}/single-user/${id}`)
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
                    hmtRole: res.data.hmtRole,
                    hospitalRole: res.data.hospitalRole,
                    photoDimensions: res.data.photoDimensions
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
        hmtRole,
        hospitalRole,
        photoDimensions,
        userData
    } = values;
    useEffect(() => {
        setValues({...values, userData: new FormData()});
        init();

    }, [id, reload]);


    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        userData.set(name, value);

        setValues({...values, [name]: value, userData, error: false, success: false});
    };


    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, error: '', loading: true, success: false});
        updateForAdmin(token, userData, id).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                updateUser(data, id, () => {
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
                        hmtRole: data.hmtRole,
                        hospitalRole: data.hospitalRole,
                        loading: false,
                        reload: !reload
                    });
                })

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


    const imgSrc = `${API}/user/photo/${username_for_photo}`


    return (

        <section>
            <div className="row mx-0">
                <div className="col-xl-4">
                    <div className={`card ${classes.Card} `}>
                        {username_for_photo && <Image
                            width={photoDimensions.width}
                            height={photoDimensions.height}
                            src={imgSrc}
                            layout='responsive'
                            className="img-fluid"
                            alt="user profile"
                        />}
                        <div
                            className={`card-body ${classes.CardBody} pt-4 d-flex flex-column align-items-center`}>
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
                                        designation={designation}
                                        hmtRole={hmtRole}
                                        photoDimensions={photoDimensions}
                                        hospitalRole={hospitalRole}/>
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
                                        hmtRole={hmtRole}
                                        hospitalRole={hospitalRole}
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

    );
};

export default UserUpdateComponent;