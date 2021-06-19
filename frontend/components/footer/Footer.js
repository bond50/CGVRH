import React from 'react';
import classes from '../../styles/Footer.module.css'
import FooterLinks from "./FooterLinks/FooterLinks";
import FooterInfo from "./FooterInfo/FooterInfo";
import FooterContact from "./FooterContact";


const Footer = () => {
    const n = new Date()
    const thisYear = n.getFullYear()
    const list = [
        {text: 'Meet Our team', href: '/about/management/board'},
        {text: 'Our Role', href: '/about/roles'},
        {text: 'Our  Goals', href: '/about/health-goals'},
        {text: 'Our Projects', href: '/about/project'},
        {text: 'Strategic plan', href: '/about/plan'},
        {text: 'Our blog', href: '/blogs'},
    ]

    const listServices = [
        {text: 'Directorates', href: '/services/directorates'},
        {text: 'Pharmacy', href: '/services/pharmacy'},
        {text: 'Laboratory', href: '/services/laboratory'},
        {text: 'Radiology/Xray', href: '/services/radiology'},
        {text: 'Ambulance', href: '/services/ambulance'},
        {text: 'Nursing Services', href: '/services/nursing'},
    ]


    return (
        <footer className={classes.Footer}>
            <div className="container">
                <div className={classes.FooterTop}>
                    <div className="row ">
                        <FooterContact/>
                        <FooterLinks list={list} header='Useful Links'/>
                        <FooterLinks list={listServices} header='features services'/>
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
    );
};

export default Footer;