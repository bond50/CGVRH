import React from 'react';
import classes from "../../styles/ShowItem.module.css";

const ShowItem = ({children, ItemTitle}) => {
    return (
        <>
            <h3 className={classes.Title}>{ItemTitle}</h3>
            <div className={classes.Item}>
                {children}
            </div>
        </>
    );
};

export default ShowItem;