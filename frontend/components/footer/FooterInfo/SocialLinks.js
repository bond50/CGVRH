import classes from "../../../styles/FooterSocialLinks.module.css";


const SocialLinks = () => (
    <div className={`${classes.SocialLinks} mt-3`}>
        <a href="#" className="facebook"><i className="bi bi-facebook"/></a>
        <a href="#" className="twitter"><i className="bi bi-twitter"/></a>
        <a href="#" className="youtube"><i className="bi bi-youtube"/></a>
        <a href="#" className="instagram"><i className="bi bi-instagram"/></a>
        <a href="#" className="google-plus"><i className="bi bi-google"/></a>
    </div>

);

export default SocialLinks;