// import classes from "../../../styles/admin-accordion-fuction.module.css";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
//
// export const accordionFunction = (accList, baseUrl, currentPath) => {
//     console.log('currentPath', currentPath)
//     return accList.map((acc, i) => {
//         const fullPath = `${baseUrl}/${acc.slug || acc.to}`;
//         return (
//             <li className={`${classes.SidebarListItem} nav-item`} key={i}>
//                 <Link href={fullPath}>
//                     <a className={`nav-link ${classes.NavLink} ${currentPath === fullPath ? classes.active : ''}`}>
//                         <Icon icon="system-uicons:circle" className={classes.icon} />
//                         <span>{acc.title}</span>
//                     </a>
//                 </Link>
//             </li>
//         );
//     });
// };
//



import classes from "../../../styles/admin-accordion-fuction.module.css";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const accordionFunction = (accList, baseUrl, currentPath) => {

    return accList.map((acc, i) => {
        const fullPath = `${baseUrl}/${acc.slug || acc.to}`;
        const isActive = currentPath === fullPath;


        return (
            <li className={`${classes.SidebarListItem} nav-item`} key={i}>
                <Link href={fullPath}>
                    <a className={`nav-link ${classes.NavLink} ${isActive ? classes.active : ''}`}>
                        <Icon icon="system-uicons:circle" className={classes.icon} />
                        <span>{acc.title}</span>
                    </a>
                </Link>
            </li>
        );
    });
};
