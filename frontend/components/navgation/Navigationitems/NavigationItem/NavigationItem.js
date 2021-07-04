import Link from "next/link";
import classes from '../../../../styles/NavigationItem.module.css'


const NavigationItem = ({href, children, active, className,clicked}) => {

    return <li className={` ${className} ${classes.NavigationItem}`} onClick={clicked}>
        <Link href={href} activeClassName={active}>
            <a>{children}</a>
        </Link>
    </li>;
}

export default NavigationItem;