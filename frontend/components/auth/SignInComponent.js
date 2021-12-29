import {useState,useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth';
import Router from 'next/router';
import Link from "next/link";
import AboutContainer from "../reusables/AboutContainer";
import LoginGoogle from "./LoginGoogle";

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'galavu10@gmail.com',
        password: '1234567890',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true, error: false});
        const user = {email, password};

        signin(user).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false});
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
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
        setValues({...values, error: false, [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group mb-3">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    };

    return (
        <AboutContainer title='Signin'>
            {showError()}
            {showLoading()}
            {showMessage()}
            <LoginGoogle/>
            {showForm && signinForm()}
            <br/>
            <Link href={`/auth/password/forgot`}>
                <a className='btn btn-danger btn-sm'>Reset password</a>
            </Link>
        </AboutContainer>
    );
};

export default SigninComponent;