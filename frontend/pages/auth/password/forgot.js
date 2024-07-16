import React, { useState } from 'react';
import { forgotPassword } from '../../../actions/auth';
import Alert from "../../../components/messages/Alert";
import classes from "../../../styles/login.module.css";
import Link from "next/link";
import Head from 'next/head';
import {APP_NAME} from "../../../config";

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        loading: false,
        showForm: true
    });

    const { email, message, error, loading, showForm } = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '', loading: true });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({ ...values, message: data.message, email: '', showForm: false, loading: false });
            }
        });
    };

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit} className='row gy-3'>
            <div className="col-12">
                <label htmlFor="name" className="form-label">Your Email</label>
                <div className="input-group ">
                    <input
                        value={email}
                        required
                        onChange={handleChange('email')}
                        type="email"
                        name="name"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="col-12">
                <button className={`btn btn-primary w-100 ${classes.Btn}`} type="submit">
                    {loading ? <div className="d-flex align-items-center">
                        <strong>Sending the token...</strong>
                        <div className="spinner-border ms-auto" role="status" aria-hidden="true"/>
                    </div> : 'Change'}
                </button>
            </div>
            <div className='text-center'>
                <div className={`col-12 ${classes.sBtn}`}>
                    <div className="small mb-0">
                        <Link href={`/signin`}>
                            <a className={`mx-1`}>Back to Login Page?</a>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Forgot Password | {APP_NAME}</title>
            </Head>
            <Alert msg={error} type='danger' label='Danger'/>
            <Alert msg={message} type='success' label='Success' reload/>
            {showForm && passwordForgotForm()}
        </>
    );
};

export default ForgotPassword;
