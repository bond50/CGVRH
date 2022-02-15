import React from 'react';
import classes from "../../styles/login.module.css";

const AuthWrapper = ({login, children}) => {
    return (
        <div className='container'>
            <section
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <a href="#" className={`${classes.Logo} d-flex align-items-center w-auto`}>
                                    <img src={`/logo/logo.png`} alt="logo"/>
                                    <span className="d-none d-lg-block">Vihiga  Referral Hospital </span>
                                </a>
                            </div>
                            <div className={`card mb-3 ${classes.Card}`}>
                                <div className={`card-body ${classes.CardBody}`}>
                                    <div className={`pt-4 pb-2 ${classes.CardTitle}`}>
                                        <h5 className={`text-center pb-0 fs-4`}>{login ? `Login to Your
                                        Account` : 'Create an account'}</h5>
                                        <p className="text-center small">{login ? 'Enter your email & password to login' : 'Enter your personal details to create account'}</p>
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default AuthWrapper;