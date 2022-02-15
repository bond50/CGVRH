import React from 'react';
import classes from './overview.module.css'


const Overview = ({username, name, hmt, about, designation, address}) => {

    return (
        <>
            {about && <>
                <h5 className={classes.CardTitle}>About</h5>
                <p className="small fst-italic">{about}</p>
            </>
            }

            <h5 className={classes.CardTitle}>Profile Details</h5>
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Full Name</div>
                <div className="col-lg-9 col-md-8">{name}</div>
            </div>

            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Username</div>
                <div className="col-lg-9 col-md-8">{username}</div>
            </div>

            {designation && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Designation</div>
                <div className="col-lg-9 col-md-8">{designation}</div>
            </div>}

            {address && <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>Address</div>
                <div className="col-lg-9 col-md-8">{address}
                </div>
            </div>}
            <div className={`row ${classes.Row} mb-3`}>
                <div className={`col-lg-3 col-md-4 ${classes.Label}`}>HMT member</div>
                <div className="col-lg-9 col-md-8">{hmt === false ? "No" : "yes"}
                </div>
            </div>


        </>
    );
};

export default Overview;