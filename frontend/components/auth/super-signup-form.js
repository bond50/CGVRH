import React from 'react';
import classes from "../profile/overview.module.css";
import Button from "../reusables/ui/Button";

const SuperSignupForm = () => {

    return (
        <form>
            <div className="row mb-3">
                <label htmlFor="profileImage"
                       className={`col-lg-3 col-md-4 ${classes.Label}`}>Profile
                    Image
                </label>
                <div className="col-md-8 col-lg-9">


                    <div className="pt-2">
                        <label className="btn btn-primary btn-sm mx-1" title="UploadFiles new profile image">
                            <i className="bi bi-upload"/>
                            <input
                                name='photo'
                                type="file"
                                accept="image/*" hidden/>
                        </label>
                    </div>
                </div>

            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Full Name</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="text"
                        className="form-control"/>
                </div>
            </div>

            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Designation</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="text"
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>HMT Member ?</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="checkbox"
                        name="hmt"/>
                </div>
            </div>


            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Address</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="text"
                        className="form-control"/>
                </div>
            </div>


            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>About</div>
                <div className="col-lg-9 col-md-8">
                  <textarea
                      className="form-control"/>
                </div>
            </div>


            <div className="text-center">
                <Button customClass={classes.Btn}
                        type='submit'
                        btnCapture={'Submit'}
                        loading={false}/>
            </div>
        </form>
    );
};

export default SuperSignupForm;