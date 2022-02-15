import classes from '../../styles/login.module.css'
import React, {useEffect, useState} from "react";
import {authenticate, isAuth, signin} from "../../actions/auth";
import Router from "next/router";
import Alert from "../messages/Alert";
import LoginGoogle from "../auth/LoginGoogle";
import Link from "next/link";
import AuthWrapper from "./auth-wrapper";

const AdminLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',

    });

    const {email, password, error, loading, message} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
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


    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <Alert msg={error} type="danger" label="Danger"/> : '');
    const showMessage = () => (message ? <Alert msg={message} type="danger" label="Danger"/> : '');

    return (
        <AuthWrapper login>
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
                    <button className={`btn btn-primary w-100 ${classes.Btn}`}
                            type="submit">Login
                    </button>
                </div>
                <LoginGoogle/>
                {showError()}
                {showLoading()}
                {showMessage()}
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">Dont have account?
                        <Link href={`/signup/`}>
                            <a className={`mx-1`}>Create an account</a>
                        </Link>
                    </div>
                </div>
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">Forgot password?
                        <Link href={`/auth/password/forgot`}>
                            <a className={`mx-1`}>Reset it here</a>
                        </Link>
                    </div>
                </div>
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">
                        <Link href={`/`}>
                            <a className={`mx-1`}>Back to home page</a>
                        </Link>
                    </div>
                </div>
            </form>
        </AuthWrapper>
    );
};

export default AdminLogin;