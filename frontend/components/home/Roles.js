import {Fragment} from "react";
import Link from "next/link";

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
                <ul>
                    <li>{desc}</li>
                </ul>
            </Fragment>
        ))

    }


    return (

        <section className='home-roles'>
            <div className="container " data-aos='slide-up'>
                <div className={`section-title`}>
                    <h2>our roles</h2>
                </div>
                <div className={`row content`}>
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
                        <Link href={`/about-us/roles`}>
                            <a className='btn-learn-more'>Read more about the roles we play in the county</a>
                        </Link>
                    </div>
                </div>
            </div>
        </section>


    );
};

export default Roles;