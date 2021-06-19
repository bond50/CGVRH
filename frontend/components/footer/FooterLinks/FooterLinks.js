import classes from "../../../styles/FooterLinks.module.css";
import FooterLink from "./FooterLink";


const FooterLinks = ({list,header}) => (
    <div className={`col-lg-3 col-md-6 ${classes.FooterLinks}`}>
        <h4>{header}</h4>
        <ul>
            {list.map(({text, href}, index) => <FooterLink key={index} href={href} text={text}/>)}
        </ul>
    </div>
);

export default FooterLinks;