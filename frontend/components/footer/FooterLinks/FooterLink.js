import Link from "next/link";
import classes from '../../../styles/FooterLink.module.css'

const FooterLink = ({href, text}) => (
    <li className={classes.FooterLink}>
        <Link href={href}>
            <a className={classes.FooterLinkA}>{text}</a>
        </Link>
    </li>
);

export default FooterLink;