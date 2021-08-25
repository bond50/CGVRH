import classes from "../../../styles/FooterLinks.module.css";


const FooterLinks = ({children, header}) => (
    <div className={`col-lg-3 col-md-6 ${classes.FooterLinks}`}>
        <h4>{header}</h4>
        <ul>
            {children}
        </ul>
    </div>
);

export default FooterLinks;