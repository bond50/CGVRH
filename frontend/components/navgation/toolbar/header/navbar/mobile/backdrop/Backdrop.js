import React from 'react';
import styles from '../../../../../../../styles/Backdrop.module.css';

const Backdrop = ({ clicked, show }) => {
    return (
        show ? <div onClick={clicked} className={styles.backdrop}></div> : null
    )
}

export default Backdrop;
