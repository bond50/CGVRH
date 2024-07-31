import React from 'react';
import styles from '../../../../../../styles/StaffLink.module.css'

const StaffLink = () => {
    return (

        <li className={styles.Staff}>
            <a href="https://mail.vihigahospital.go.ke" className={styles.StaffLink} target="_blank"
               rel="noopener noreferrer">
                Access staff mail
            </a>
        </li>


    );
};

export default StaffLink;