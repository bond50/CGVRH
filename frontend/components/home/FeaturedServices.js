import styles from "../../styles/featured-services.module.css";
import renderHTML from "react-render-html";
import Link from "next/link";


const FeaturedServices = ({featured}) => {
    const info = [
        {
            header: 'Pharmacy',
            delay: 100,
            paragraph: ' Highly skilled pharmacy team which offer professional services to clients.We offer both outpatient and inpatient services. We dispense standard medicines at affordable prices.',
            to: '/services/pharmacy'
        },
        {
            header: 'Laboratory',
            delay: 200,
            paragraph: 'Our Laboratory is accredited as a medical testing laboratory upon satisfying the requirement of ISO 15189:2012.. by KENAS. We have a well equipped Laboratory  with talented staff who offer best services in the region.',
            to: '/services/laboratory'
        },
        {
            header: 'Radiology',
            paragraph: 'Amazing, CT scan machines , Ultrasound services, Powerful X-ray\'s, Opg services, Mammogram services , well trained radiographers and radiologist',
            to: '/services/radiology'
        },
        {
            header: 'Intensive care unit',
            delay: 400,
            paragraph: 'Patients within the hospital are normally reviewed by the most experienced ICU doctor/Clinician who  consults both the primary Doctor and the anaesthesologist/intensivist',
            to: '/services/icu'
        },

    ]


    function returnColumns() {
        return featured && featured.map(service => {
                return <div className="col-lg-4 mb-4" key={service._id}>
                    <div className={styles.card} data-aos="zoom-in" data-aos-delay="100">
                        <i className="bi bi-gear"/>
                        <div className="card-body">
                            <h5 className="card-title">{service.title.toLowerCase()}</h5>
                            <div className='card-text'>
                                {renderHTML(service.excerpt)}
                            </div>
                            <Link href={`/general/${service.slug}`}>
                                <a className={styles.readMore}>Read more </a>
                            </Link>
                        </div>
                    </div>
                </div>

            }
        )
    }

    return (

        <section className={`${styles.section} `}>
            <div className="container">
                <div className={styles.SectionTitle} data-aos="zoom-out" data-aos-once='true'>
                    <h2>Featured Services</h2>
                </div>

                <div className="row row-eq-height justify-content-center">
                    {returnColumns()}
                </div>
            </div>


        </section>


    );
};

export default FeaturedServices;