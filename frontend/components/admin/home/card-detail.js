import React from 'react';
import classes from "./index.module.css";


const CardDetail = ({children, spanText, title}) => {
    return (
        <div className="col-12">
            <div className={`card ${classes.Blogs}`}>
                <div className="card-body">
                    <h5 className="card-title">{title}<span>| {spanText}</span></h5>
                    <div className="table-responsive">
                        <table className="table table-borderless ">
                            <thead>
                            <tr>
                                <th scope="col">Content Creator</th>
                                <th scope="col">Content title</th>
                                <th scope="col">Date created</th>
                                <th colSpan='2' scope="col">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;