import React from 'react';
import classes from '../../../styles/webmailLink.module.css'

const WebmailLink = () => {
    return (

        <a href="https://webmail.vihigahospital.go.ke/"
           className={classes.Btn}>
            <span className="d-none d-md-inline">Access Staff Email</span>
        </a>

    );
};

export default WebmailLink;