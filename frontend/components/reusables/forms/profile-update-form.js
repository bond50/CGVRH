import React from 'react';
import Button from "../ui/Button";
import classes from "../../../styles/Contact.module.css";

const ProfileUpdateForm = ({
                               handleSubmit,
                               handleChange,
                               username,
                               name,
                               about,
                               password,
                               errorMsg,
                               successMsg,
                               btnText,
                               loading
                           }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="btn btn-outline-primary ">
                    Profile photo
                    <input
                        name='photo'
                        onChange={handleChange("photo")}
                        type="file"
                        accept="image/*" hidden/>
                </label>
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Username</label>
                <input
                    onChange={handleChange('username')}
                    type="text"
                    value={username || ''}
                    className="form-control"/>
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    type="text"
                    value={name || ''}
                    className="form-control"/>
            </div>

            <div className="form-group mb-3">
                <label className="text-muted">About</label>
                <textarea
                    onChange={handleChange('about')}
                    value={about || ''}
                    className="form-control"/>
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    value={password || ''}
                    className="form-control"/>
            </div>
            <div>
                {errorMsg()}
                {successMsg()}
            </div>
            <div>
                <Button customClass={classes.Btn}
                        type='submit'
                        btnCapture={btnText}
                        loading={loading}/>
            </div>
        </form>
    );
};

export default ProfileUpdateForm;