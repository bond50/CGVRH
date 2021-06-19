import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from '../../styles/Column.module.css'

const Column = ({to, header, icon, paragraph, delay}) => (
    <div className={`col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0`}>
        <div className={`${classes.IconBox}`} data-aos='zoom-out' data-aos-delay={delay} data-aos-once='true'>
            {/*<div className={`${classes.Icon}`}><i><FontAwesomeIcon icon={icon} size='xs'/></i></div>*/}
            <h4 className={classes.Title}>
                <Link href={to}>
                    <a>{header}</a>
                </Link>
            </h4>
            <p className={classes.Description}>{paragraph}</p>
        </div>
    </div>
);

export default Column;