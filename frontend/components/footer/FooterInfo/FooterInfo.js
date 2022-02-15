import classes from "../../../styles/FooterInfo.module.css";


const FooterInfo = () => {
    return (
        <div className={`col-lg-3 col-md-6 ${classes.FooterInfo}`}>
            <h4>Our Social Networks</h4>
            <p> We are committed to providing equitable, affordable and quality health care of the
                highest standard to all our residents as stipulated in the Bill of Rights in the
                Constitution 2010. You can find us on social networks
            </p>

        </div>
    );
};

export default FooterInfo;