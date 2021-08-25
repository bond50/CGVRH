import classes from '../../styles/Footer.module.css'
import FooterLinks from "./FooterLinks/FooterLinks";
import FooterInfo from "./FooterInfo/FooterInfo";
import FooterContact from "./FooterContact";
import useSWR from "swr";
import {API} from "../../config";
import FooterLink from "./FooterLinks/FooterLink";
import {Fragment} from "react";
import ScrollTop from "../ScrollTop";




const Footer = () => {

    const {data: services, error} = useSWR(`${API}/featured-services`)


    const n = new Date()
    const thisYear = n.getFullYear()
    const list = [
        {title: 'Meet Our team', link: '/about/board-members/'},
        {title: 'County website', link: 'https://vihiga.go.ke/'},
        {title: 'MOH', link: 'https://www.health.go.ke/'},
        {title: 'Strategic plan', link: '/about/strategic-plan/'},
        {title: 'Our blog', link: '/blogs'},
    ]


    return (
        <Fragment>
            <footer className={classes.Footer}>
                <div className="container">
                    <div className={classes.FooterTop}>
                        <div className="row ">
                            <FooterContact/>
                            <FooterLinks header='Featured services'>
                                {!services || error ? <div>Loading</div> :
                                    services.map(s => <FooterLink
                                        key={s._id}
                                        link={`/services/${s.slug}`}
                                        title={s.title}/>)
                                }
                            </FooterLinks>
                            <FooterLinks header='Useful Links'>
                                {list.map((l, i) => <FooterLink
                                    key={i}
                                    link={l.link}
                                    title={l.title}/>)}
                            </FooterLinks>
                            <FooterInfo/>
                        </div>
                    </div>
                </div>

                <div className="container py-4">
                    <div className={classes.Copyright}>
                        &copy; Copyright <strong><span>{thisYear} Vihiga County Referral Hospital</span></strong>.
                        All Rights Reserved
                    </div>
                </div>
            </footer>
            <ScrollTop/>
        </Fragment>

    );
};

export default Footer;