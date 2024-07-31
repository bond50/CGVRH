import Link from "next/link";
import classes from '../../../styles/FooterLink.module.css'
import { Icon } from "@iconify/react";


const FooterLink = ({link, title}) => (
    <li className={classes.FooterLink}>
        <Icon icon='bi:chevron-right' className={classes.Icon}/>
        <Link href={link}>
            <a className={classes.FooterLinkA}>{title}</a>
        </Link>
    </li>
);

export default FooterLink;