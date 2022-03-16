import classes from '../../styles/Footer.module.css'
import FooterLinks from "./FooterLinks/FooterLinks";
import FooterInfo from "./FooterInfo/FooterInfo";
import FooterContact from "./FooterContact";
import useSWR from "swr";
import {API} from "../../config";
import FooterLink from "./FooterLinks/FooterLink";
import {Fragment} from "react";
import ScrollTop from "../ScrollTop";
import SocialLinks from "./SocialLinks";


const Footer = () => {

    const {data: services, error} = useSWR(`${API}/featured-general`)
    const n = new Date()
    const thisYear = n.getFullYear()
    const list = [
        {
            title: 'Elephant System',
            link: 'https://auth0.platform-proxy.kenya.elephantprimarycare.com/login?state=hKFo2SBLeUFVWmVrZ0Z5WWtNOHRpcTZiVHpyeW4yZzhLc0M4cKFupWxvZ2luo3RpZNkgdFBYdnlCMlk0Z0JJR3RMU2xiN2FtNjd2X05PTHJXVU6jY2lk2SBvalBNNXNFc0VVODFuajVjemFNakVCU0RMZmx0dGlpaA&client=ojPM5sEsEU81nj5czaMjEBSDLflttiih&protocol=oauth2&prompt=login&redirect_uri=https%3A%2F%2Fkenya.elephantprimarycare.com%2Fauth0%2Fcallback&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=VmVjYm9YcGhGYzVhcXRwVjNOcDBLLVR1TDM0ZGlrNWlGVW5FRDlmeU9Ndg%3D%3D&code_challenge=TYmJ6XpMyJru7nvihDZU-zRr_2kCnGEY3DtA_fsMxJ4&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4yLjAifQ%3D%3D'
        },
        {title: 'Meet Our HMT  team', link: '/about/board-members/'},
        {title: 'County website', link: 'https://vihiga.go.ke/'},
        {title: 'County Vacancies', link: 'https://vihiga.go.ke/career.html'},
        {title: 'MOH', link: 'https://www.health.go.ke/'},
        {title: 'About plan', link: '/about/strategic-plan/'},
        {title: 'Our blog', link: '/blogs'},
    ]


    return (
        <Fragment>
            <footer className={classes.Footer}>
                <div className={classes.FooterTop}>
                    <div className="container">
                        <div className="row ">
                            <FooterContact/>
                            <FooterLinks header='Featured services'>
                                {!services || error ? <div>Loading</div> :
                                    services.map(s => <FooterLink
                                        key={s._id}
                                        link={`/general/${s.slug}`}
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

                <div className="container d-md-flex py-4">
                    <div className="me-md-auto text-center text-md-start">
                        <div className={classes.Copyright}>
                            &copy; Copyright <strong><span>{thisYear} Vihiga County Referral Hospital</span></strong>.
                            All Rights Reserved
                        </div>
                    </div>
                    <SocialLinks/>
                </div>
            </footer>
            <ScrollTop/>
        </Fragment>

    );
};

export default Footer;