import {faMedkit, faXRay, faMicroscope, faHospitalUser} from '@fortawesome/free-solid-svg-icons'
import Column from "./Column";
import classes from '../../styles/Util.module.css'
import styles from "../../styles/Util.module.css";

const ServiceBief = () => {
    const info = [
        {
            header: 'Pharmacy',
            delay: 100,
            icon: faMedkit,
            paragraph: ' Highly skilled pharmacy team which offer professional services to clients.We offer both outpatient and inpatient services. We dispense standard medicines at affordable prices.',
            to: '/services/pharmacy'
        },
        {
            header: 'Laboratory',
            delay: 200,
            icon: faMicroscope,
            paragraph: 'Our Laboratory is accredited as a medical testing laboratory upon satisfying the requirement of ISO 15189:2012.. by KENAS. We have a well equipped Laboratory  with talented staff who offer best services in the region.',
            to: '/services/laboratory'
        },
        {
            header: 'Radiology',
            delay: 300,
            icon: faXRay,
            paragraph: 'Amazing, CT scan machines , Ultrasound services, Powerful X-ray\'s, Opg services, Mammogram services , well trained radiographers and radiologist',
            to: '/services/radiology'
        },
        {
            header: 'Intensive care unit',
            delay: 400,
            icon: faHospitalUser,
            paragraph: 'Patients within the hospital are normally reviewed by the most experienced ICU doctor/Clinician who  consults both the primary Doctor and the anaesthesologist/intensivist',
            to: '/services/icu'
        },

    ]


    function returnColumns() {
        return info.map(({header, icon, delay, paragraph, to}, i) => {
            return <Column
                key={i} classname={`col-md-6 col-lg-3 d-flex align-items-stretch mb-5 lg-0`}
                to={to}
                delay={delay}
                title={header} btnCaption={'See More'}>
                <li>{paragraph}</li>
            </Column>
        })

    }

    return (

        <section className={`${classes.Section} ${classes.SectionBg}`}>
            <div className="container">
                <div className={styles.SectionTitle} data-aos="zoom-out" data-aos-once='true'>
                    <h2>Featured Services</h2>
                </div>

                <div className="row">
                    {returnColumns()}
                </div>
            </div>


        </section>


    );
};

export default ServiceBief;