import React, {useEffect, useState} from 'react';
import {getCookie, updateUser} from '../../actions/auth';
import {getProfile, update} from '../../actions/user';
import {API} from '../../config';
import Alert from "../messages/Alert";
import ProfileUpdateForm from "../reusables/forms/profile-update-form";
import Image from "next/image";


const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        photoDimensions:{},
        userData: process.browser && new FormData()
    });

    const token = getCookie('token');
    const {
        username,
        username_for_photo,
        name,
        about,
        password,
        error,
        success,
        loading,
        photo,
        userData
        ,photoDimensions
    } = values;

    const init = () => {
        getProfile(token)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({
                        ...values,
                        username: data.username,
                        username_for_photo: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        photoDimensions:data.photoDimensions
                    });

                }
            });
    };

    useEffect(() => {
        init();
        setValues({...values, userData: new FormData()});
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        // let userData = new FormData();
        userData.set(name, value);
        console.log(...userData); // SEE THE FORMDATA IN CONSOLE
        setValues({...values, [name]: value, userData, error: false, success: false});
    };


    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true});
        update(token, userData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                updateUser(data,null, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    let btnText = 'Update'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Sending...</>
    }

    const showSuccessMessage = () => success && <div>
        <Alert msg="Profile Updated " label='Success' type='success'/>
    </div>


    const showErrorMessage = () => (
        <Alert msg={error} type="danger" label="Danger"/>
    );


    return (

        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    {username_for_photo && <Image
                        src={`${API}/user/photo/${username_for_photo}`}
                        width={photoDimensions.width}
                        height={photoDimensions.height}
                        layout='responsive'
                        alt="user profile"
                    />}
                </div>
                <div className="col-md-8 mb-5">
                    <ProfileUpdateForm
                        username={username}
                        about={about}
                        btnText={btnText}
                        errorMsg={showErrorMessage}
                        loading={loading}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        name={name}
                        password={password}
                        successMsg={showSuccessMessage}/>
                </div>
            </div>
        </div>

    );
};

export default ProfileUpdate;