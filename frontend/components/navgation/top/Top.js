import classes from './top.module.css'

import {YearsOperated} from "../../years-operated/YearsOperated";


const Top = () => (


    <div className={`d-flex align-items-center ${classes.TopBar}`}>
        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
            <div className="d-flex align-items-center d-none d-md-flex">
                <i className="bi bi-calendar2-check-fill "/><span><YearsOperated/> Years of Quality Service </span>
            </div>

            <div className="align-items-center ">
                <i className="bi bi-clock"/> Opening hours: Throughout
            </div>
            <div className="align-items-center">
                <i className="bi bi-phone"/> Call us now +254 723 103 564
            </div>
        </div>
    </div>
);

export default Top;