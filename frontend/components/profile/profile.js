import React from 'react';
import classes from './overview.module.css'
import Button from "../reusables/ui/Button";
import {isAuth} from "../../actions/auth";


const Profile = ({
                     handleCheckBox,
                     handleSubmit,
                     handleChange,
                     username,
                     hmtRole,
                     hospitalRole,
                     name,
                     role,
                     email,
                     toggleRole,
                     about,
                     errorMsg,
                     twitter,
                     facebook,
                     address,
                     linkedIn,
                     instagram,
                     designation,
                     successMsg,
                     btnText,
                     hmt,
                     loading
                 }) => {

    return (
        <form onSubmit={handleSubmit}>
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
                                onChange={handleChange("photo")}
                                type="file"
                                accept="image/*" hidden/>
                        </label>
                    </div>
                </div>

            </div>

            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Username</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('username')}
                        type="text"
                        value={username || ''}
                        className="form-control"/>
                </div>
            </div>
            {isAuth() && isAuth().role === 1 && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Email Address</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('email')}
                        type="email"
                        value={email || ''}
                        className="form-control"/>
                </div>
            </div>}

            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Designation</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('designation')}
                        type="text"
                        value={designation || ''}
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Hospital Role</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('hospitalRole')}
                        placeholder='e.g The Hospital Administrator , The Medical Superintendent'
                        type="text"
                        value={hospitalRole || ''}
                        className="form-control"/>
                </div>
            </div>

            {isAuth() && isAuth().role === 1 && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>HMT Member</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="checkbox" value={hmt || ''}
                        name="hmt"
                        checked={hmt}
                        onChange={handleCheckBox}/> {hmt === false ? "No" : "Yes"}
                </div>
            </div>}

            {isAuth() && isAuth().role === 1 && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>is admin</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        type="checkbox"
                        value={role || ''}
                        name="role"
                        checked={role !== 0}
                        onChange={toggleRole}/>
                    {role === 1 ? "Yes" : "No"}
                </div>
            </div>}


            {hmt && isAuth() && isAuth().role === 1 && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>HMT Role</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('hmtRole')}
                        placeholder='e.g Chairman , Executive member'
                        type="text"
                        value={hmtRole || ''}
                        className="form-control"/>
                </div>
            </div>}


            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}> Address</div>
                <div className="col-lg-9 col-md-8"><input
                    onChange={handleChange('address')}
                    type="text"
                    value={address || ''}
                    className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Full Name</div>
                <div className="col-lg-9 col-md-8">
                    <input
                        onChange={handleChange('name')}
                        type="text"
                        value={name || ''}
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>About</div>
                <div className="col-lg-9 col-md-8">
                  <textarea
                      onChange={handleChange('about')}
                      placeholder='Write something about yourself'
                      value={about || ''}
                      className="form-control"/>
                </div>
            </div>

            <div className={`row ${classes.Row} mb-3 text-muted`}>
                <p className='fst-italic'>If you want people to find you on social media copy paste your links in the
                    spaces below</p>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <label htmlFor="Twitter"
                       className={`col-md-4 col-lg-3 col-form-label  
                       ${classes.Label}`}>Twitter Link
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange('twitter')}
                        type="text"
                        id='Twitter'

                        value={twitter || ''}
                        className="form-control"/>
                </div>
            </div>

            <div className={`row ${classes.Row} mb-3`}>
                <label
                    htmlFor="fb"
                    className={`col-md-4 col-lg-3 col-form-label 
                        ${classes.Label}`}>Facebook Link
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange('facebook')}
                        type="text"
                        id='fb'
                        value={facebook || ''}
                        className="form-control"/>
                </div>
            </div>

            <div className={`row ${classes.Row} mb-3`}>
                <label htmlFor="instagram"
                       className={`col-md-4 col-lg-3 col-form-label  ${classes.Label}`}>Instagram Link
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange('instagram')}
                        type="text"
                        id='instagram'
                        value={instagram || ''}
                        className="form-control"/>
                </div>
            </div>
            <div className={`row ${classes.Row} mb-3`}>
                <label htmlFor="instagram"
                       className={`col-md-4 col-lg-3 col-form-label  ${classes.Label}`}>Linkedin Link
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange('linkedIn')}
                        type="text"
                        id='linkedIn'
                        value={linkedIn || ''}
                        className="form-control"/>
                </div>
            </div>


            <div>
                {errorMsg()}
                {successMsg()}
            </div>

            <div className="text-center">
                <Button customClass={classes.Btn}
                        type='submit'
                        btnCapture={btnText}
                        loading={loading}/>
            </div>
        </form>
    );
};

export default Profile;