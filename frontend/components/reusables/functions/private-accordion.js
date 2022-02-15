import classes from "../../../styles/admin-accordion.module.css";
import Link from "next/link";


export const accordionPrivateFunction = (accList) => {
    return accList.map((acc, i) => {
        return <li className={`${classes.SidebarListItem}  nav-item`} key={i}>
            <Link href={`/user/${acc.to}`}>
                <a className={`nav-link ${classes.NavLink}`}>
                    <i className="bi bi-circle"/>
                    <span>{acc.title}</span>
                </a>
            </Link>
        </li>
    })
}
