import Link from "next/link";
import {Fragment} from "react";

import classes from '../../styles/Roles.module.css'

const Roles = () => {

    const list = [
        {
            desc: ' We act as County referral hospital for 3 sub county hospitals and as an intermediary\n' +
                'to national and teaching referral hospitals',
        },
        {
            desc: ' We serve as County center for provision of specialised health care.',
        },

    ]

    const returnList = () => {
        return list.map(({desc}, i) => (
            <Fragment key={i}>
                <ul className={classes.Ul}>
                    <li className={`${classes.Li} `}><i className={`bi bi-check2-all ${classes.I}`}/>{desc}</li>
                </ul>
            </Fragment>
        ))

    }


    return (

        <section className={classes.Section}>
            <div className="container ">

                {/*<div className={styles.SectionTitle} data-aos='zoom-out' data-aos-once='true'>*/}
                {/*    <h2>Our roles</h2>*/}
                {/*</div>*/}
                <div className={`row ${classes.RowContent}`} data-aos='fade-up' data-aos-once='true'>
                    <div className="col-lg-6">
                        <p>VCRH plays its roles in the county by providing a wide range of health services in
                            partnership
                            with
                            the greater community and other institutions. Some of the roles played by the hospital in
                            the
                            county
                            include
                        </p>
                        {returnList()}
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0">
                        <p>We offer teaching and training for for health care personnel such as nurses,medical
                            interns,pharmacist interns,pharmaceutical technologist interns,laboratory
                            technologists,nutritionists, health records and information officers</p>
                        <p>We also implement health policy at facility level and maintain quality standards and Provide
                            technical support to sub-county hospitals and health centers.</p>
                        {/*<Link href={`/about/roles`}>*/}
                        {/*    <a className={classes.Button}>Click to see more</a>*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        </section>


    );
};

export default Roles;