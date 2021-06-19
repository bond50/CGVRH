import {useState, useEffect} from 'react';
import {isAuth, signup} from '../../actions/auth';
import Router from 'next/router';
import AboutContainer from "../reusables/AboutContainer";

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'kufu',
        email: 'kufu@gmail.com',
        password: '1234567890',
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

        signup(user)
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
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Type your name"
                    />
                </div>

                <div className="form-group mb-3">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        required
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
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    };

    return (
        <AboutContainer title='Sign up'>
            {showLoading()}

            {showError()}
            {showMessage()}
            {showForm&&signupForm()}
        </AboutContainer>
    );
};

export default SignupComponent;