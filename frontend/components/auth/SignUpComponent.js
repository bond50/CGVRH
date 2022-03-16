import React, {useEffect, useState} from 'react';
import {isAuth, preSignup} from '../../actions/auth';
import Router from 'next/router';
import AuthWrapper from "./auth-wrapper";
import classes from "../../styles/login.module.css";
import Link from "next/link";

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {name, email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/user`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true, error: ''});
        const user = {name, email, password};

        preSignup(user)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        loading: false,
                        message: data.message,
                        showForm: false
                    });
                }
            });
    };

    const handleChange = name => e => {
        setValues({...values, error: '', [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} className='row gy-3'>

                <div className="col-12">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <div className="input-group ">
                        <input
                            value={name}
                            required
                            onChange={handleChange('name')}
                            type="text"
                            name="name"
                            className="form-control"
                        />
                    </div>
                </div>


                <div className="col-12">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <div className="input-group ">
                        <input
                            value={email}
                            onChange={handleChange('email')}
                            type="email"
                            required
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="col-12">
                    <label htmlFor="email" className="form-label">Password</label>
                    <div className="input-group ">
                        <input

                            value={password}
                            onChange={handleChange('password')}
                            type="password"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms"
                               required/>
                        <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <a
                            href="#">terms and conditions</a></label>
                        <div className="invalid-feedback">You must agree before submitting.</div>
                    </div>
                </div>

                <div className="col-12">
                    <button className={`btn btn-primary w-100 ${classes.Btn}`}
                            type="submit">Create account
                    </button>
                </div>
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">Already have account?
                        <Link href={`/signin/`}>
                            <a className={`mx-1`}>Login</a>
                        </Link>
                    </div>
                </div>
                {/*<div className={`col-12 ${classes.sBtn}`}>*/}
                {/*    <div className="small mb-0">*/}
                {/*        <LoginGoogle/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">
                        <Link href={`/`}>
                            <a className={`mx-1`}>Back to home page</a>
                        </Link>
                    </div>
                </div>
            </form>
        );
    };

    return (
        <AuthWrapper register>
            {showLoading()}
            {showError()}
            {showMessage()}
            {showForm && signupForm()}
        </AuthWrapper>
    );
};

export default SignupComponent;