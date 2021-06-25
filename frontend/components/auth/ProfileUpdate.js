import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getProfile, update} from '../../actions/user';
import {API} from "../../config";
import Alert from "../messages/Alert";
import Button from "../reusables/ui/Button";
import classes from "../../styles/Contact.module.css";


const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        about: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });
    const token = getCookie('token');
    const {username, name, about, email, password, error, success, loading, photo, userData} = values;


    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true});
        update(token, userData).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false, loading: false});
            } else {
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
            }
        });
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData();
        userFormData.set(name, value);
        setValues({...values, [name]: value, userData: userFormData, error: false, success: false});
    };
    let btnText = 'Send Message'
    if (loading) {
        btnText = <><span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/> Sending...</>
    }


    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="btn btn-outline-primary">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
                </label>
            </div>

            <div className="form-group mb-3">
                <label className="text-muted mb-1">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control"/>
            </div>

            <div className="form-group mb-3">
                <label className="text-muted mb-1">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control"/>
            </div>
            <div className="form-group mb-3 ">
                <label className="text-muted mb-1">Email</label>
                <input onChange={handleChange('email')} type="text" value={email} className="form-control"/>
            </div>
            <div className="form-group mb-3">
                <label className="text-muted mb-1">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control"/>
            </div>
            <div className="form-group mb-3">
                <label className="text-muted mb-1">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control"/>
            </div>
            <div>
                <div className='mt-3'>
                    {showSuccessMessage()}
                    {showErrorMessage()}
                </div>

                <Button customClass={classes.Btn}
                        type='submit'
                        btnCapture={btnText}
                        loading={loading}/>

            </div>
        </form>
    );

    const init = () => {
        getProfile(token).then(data => {
            console.log(data.about)

            if (data.error) {
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);


    const showSuccessMessage = () => success && <div>
        <br/>
        <Alert msg="Your Profile has been updated successfully" label='Success' type='success'/>
    </div>


    const showErrorMessage = () => (
        <Alert msg={error} type="danger" label="Danger"/>
    );


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`${API}/user/photo/${username}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{maxHeight: 'auto', maxWidth: '100%'}}
                        alt="user profile"
                    />
                </div>
                <div className="col-md-8 mb-5">
                    {profileUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;