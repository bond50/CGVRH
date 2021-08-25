import Link from "next/link";
import classes from '../../../styles/FooterLink.module.css'

const FooterLink = ({link, title}) => (
    <li className={classes.FooterLink}>
        <Link href={link}>
            <a className={classes.FooterLinkA}>{title}</a>
        </Link>
    </li>
);

export default FooterLink;