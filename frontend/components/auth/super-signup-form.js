import React, {useState} from 'react';
import classes from "../profile/overview.module.css";
import Button from "../reusables/ui/Button";
import {superSignup} from "../../actions/auth";

const SuperSignupForm = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        hospitalRole: '',
        designation: '',
        role: 0,
        error: null,
        loading: false,
        message: '',
        showForm: true
    });

    const {
        name,
        email,
        hospitalRole,
        designation,
        role,
        password,
        error,
        loading,
        message,
    } = values;


    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true, error: ''});
        const user = {
            name: name,
            email: email,
            password: password,
            designation: designation,
            role: role,
            hospitalRole: hospitalRole
        };


        superSignup(user)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        role: 0,
                        designation: '',
                        password: '',
                        photo: null,
                        error: '',
                        loading: false,
                        message: data.message,
                        showForm: false
                    });
                }
            });
    };

    const handleChange = name => e => {
        let value
        value = name === 'role' ? role === 0 ? 1 : 0 : e.target.value;
        setValues({...values, error: '', [name]: value});
    };

    function showForm() {
        return <form onSubmit={handleSubmit}>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Full Name</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="text"
                        value={name}
                        name='name'
                        required
                        onChange={handleChange('name')}
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Hospital Role if any</div>
                <div className="col-lg-9 col-md-8">
                    <div className="col-lg-9 col-md-8">
                        <input
                            placeholder='eg The Hospital Administrator'
                            type="text"
                            value={hospitalRole}
                            onChange={handleChange('hospitalRole')}
                            className="form-control"/>
                    </div>
                </div>
            </div>


            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Designation</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="text"
                        value={designation}
                        name='designation'
                        onChange={handleChange('designation')}
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Email Address</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="email"
                        value={email}
                        name='email'
                        placeholder='Provide an email and password if you want the user to login'
                        onChange={handleChange('email')}
                        className="form-control"/>
                </div>
            </div>
            {email && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Password</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="password"
                        value={password}
                        
                        name='password'
                        placeholder='The user will be able to login with email and password provided'
                        onChange={handleChange('password')}
                        className="form-control"/>
                </div>
            </div>
            }

            {email && password && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Make the user admin</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="checkbox"
                        value={role}
                        name="role"
                        checked={role !== 0}
                        onChange={handleChange('role')}/>
                </div>
            </div>
            }
            <div className="text-center">
                <Button
                    customClass={classes.Btn}
                    type='submit'
                    btnCapture={showLoading()}
                    loading={false}/>
            </div>
        </form>

    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : 'Submit');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');
    return (
        <>
            {showMessage()}
            {showError()}
            {showForm()}

        </>

    );
};

export default SuperSignupForm;