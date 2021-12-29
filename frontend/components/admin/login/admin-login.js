import classes from './admin-login.module.css'
import React, {useEffect, useState} from "react";
import {authenticate, isAuth, signin} from "../../../actions/auth";
import Router from "next/router";
import Alert from "../../messages/Alert";
import LoginGoogle from "../../auth/LoginGoogle";
import Link from "next/link";

const AdminLogin = () => {
    const [values, setValues] = useState({
        email: 'galavu10@gmail.com',
        password: '1234567890',
        error: '',
        loading: false,
        message: '',

    });

    const {email, password, error, loading, message} = values;

    useEffect(() => {
        isAuth() && Router.push(`/admin2`);
    }, []);


    const handleFormSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true, error: ''});
        const user = {email, password};
        signin(user).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin2`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({...values, error: '', [name]: e.target.value});
    };


    const showSuccessMessage = () => success && <div>
        <br/>
        <Alert msg="Your Message has been Sent.Thank you" label='Success' type='success'/>
    </div>


    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <Alert msg={error} type="danger" label="Danger"/> : '');
    const showMessage = () => (message ? <Alert msg={message} type="danger" label="Danger"/> : '');
    const showForm = () => {
        return <div className="container">
            <section
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <a href="/admin2" className={`${classes.Logo} d-flex align-items-center w-auto`}>
                                    <img src={`/logo/logo.png`} alt="logo"/>
                                    <span className="d-none d-lg-block">Vcrh administration </span>
                                </a>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className= {`pt-4 pb-2 ${classes.CardTitle}`}>
                                        <h5 className={`text-center pb-0 fs-4`}>Login to Your
                                            Account</h5>
                                        <p className="text-center small">Enter your email & password to login</p>
                                    </div>

                                    <form className="row g-3" onSubmit={handleFormSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <div className="input-group ">
                                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                <input
                                                    type="email"
                                                    name="username"
                                                    className="form-control"
                                                    id="email"
                                                    required
                                                    value={email}
                                                    onChange={handleChange('email')}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                value={password}
                                                onChange={handleChange('password')}
                                                required/>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="remember"
                                                       value="true" id="rememberMe"/>
                                                <label className="form-check-label" htmlFor="rememberMe">Remember
                                                    me</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className={`btn btn-primary w-100 ${classes.Btn}`} type="submit">Login</button>
                                        </div>
                                        <LoginGoogle/>
                                        {showError()}
                                        {showLoading()}
                                        {showMessage()}
                                        <div className={`col-12 ${classes.sBtn}`}>
                                            <p className="small mb-0">Forgot password?
                                                <Link
                                                    href={`/auth/password/forgot`}>
                                                    <a className={`mx-1`}>Reset it here</a>
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>

    }

    return (
        <>
            {showForm()}
        </>
    );
};

export default AdminLogin;