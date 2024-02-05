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

    const {data: services, error} = useSWR(`${API}/featured-general`)
    const {data: blogs, error: blogErr} = useSWR(`${API}/featured-blogs`)
    const n = new Date()
    const thisYear = n.getFullYear()
    const list = [
        // {
        //     title: 'Elephant System',
        //     link: 'https://kenya.elephantprimarycare.com/'
        // },
        {title: 'County website', link: 'https://vihiga.go.ke/'},
        {title: 'Health Management team', link: '/about-us/board-members'},
        {title: 'MOH', link: 'https://www.health.go.ke/'},
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
                             <FooterLinks header='Blog'>
                                {!blogs || blogErr ? <div>Loading</div> :
                                    blogs.map(s => <FooterLink
                                        key={s._id}
                                        link={`/blogs/${s.slug}`}
                                        title={s.title}/>)
                                }
                            </FooterLinks>

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
                    {/*<SocialLinks/>*/}
                </div>
            </footer>
            <ScrollTop/>
        </Fragment>

    );
};

export default Footer;