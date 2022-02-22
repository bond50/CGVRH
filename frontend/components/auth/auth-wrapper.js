import React from 'react';
import classes from "../../styles/login.module.css";

const AuthWrapper = ({login, children, password, register}) => {
    return (
            <section
                className={` ${classes.Section}`}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            {
                                !password &&
                                <div className="d-flex justify-content-center py-4">
                                    <a href="#" className={`${classes.Logo} d-flex align-items-center w-auto`}>
                                        <img src={`/logo/logo.png`} alt="logo"/>
                                        <span className="d-none d-lg-block">Vihiga  Referral Hospital </span>
                                    </a>
                                </div>
                            }
                            <div className={`card mb-3 ${classes.Card}`}>

                                <div className={`card-body ${classes.CardBody}`}>
                                    {/*<div className='text-center mt-4'>*/}
                                    {/*    <h3><i className="fa fa-lock fa-4x"/></h3>*/}
                                    {/*</div>*/}
                                    <div className={`pt-4 pb-2 ${classes.CardTitle}`}>


                                        {login && <h5 className={`text-center pb-0 fs-4`}> Login to Your Account</h5>}
                                        {register && <h5 className={`text-center pb-0 fs-4`}>Create an account</h5>}
                                        {password &&
                                        <h5 className={`text-center pb-0 fs-4`}>Forgot password ?</h5>}
                                        {login &&
                                        <p className="text-center small">Enter your email & password to login </p>}
                                        {register &&
                                        <p className="text-center small">Enter your personal details to create
                                            account </p>}
                                        {password &&
                                        <p className="text-center small">You can reset your password here </p>}

                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

    );
};

export default AuthWrapper;