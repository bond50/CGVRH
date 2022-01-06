import classes from './admin-sidebar.module.css'
import Link from 'next/link'
import React from "react";

import {useAccordionButton} from "react-bootstrap/AccordionButton";
import Accordion from "react-bootstrap/Accordion";
import useToggle from "../../../hooks/useToggle";


const AdminSidebar = ({closed}) => {
    let attachedClasses = [classes.Sidebar, classes.CloseMobile];

    if (closed) {
        attachedClasses = [classes.Sidebar, classes.Close];
    }
    const [showChevron, toggleChevron] = useToggle()

    let chevronClass = [classes.ChevronDown, 'bi bi-chevron-down', ' ms-auto']
    if (showChevron) {
        chevronClass.push(classes.Rotate)
    }

    function CustomToggle({children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            toggleChevron(),
        );

        return (
            <div className={`nav-link ${classes.NavLink}`} onClick={decoratedOnClick}>
                {children}
            </div>
        );
    }


    return (
        <aside className={attachedClasses.join(' ')}>
            <ul className={classes.SidebarList}>
                <li className={classes.NavHeading}>Dashboard</li>

                <li className={`${classes.SidebarListItem}  nav-item`}>
                    <Link href={`/admin2`}>
                        <a className={`nav-link ${classes.NavLink} ${classes.active}`}>
                            <i className="bi bi-grid"/>
                            <span>Home</span>
                        </a>
                    </Link>
                </li>

                <li className={`${classes.SidebarListItem}  nav-item`}>
                    <Link href={`/analytics`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-graph-up"/>
                            <span>Analytics</span>
                        </a>
                    </Link>
                </li>
                <li className={classes.NavHeading}>Blog</li>
                <li className={`${classes.SidebarListItem} ${classes.active} nav-item`}>
                    <Link href={`/admin2/crud/category-tag`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-person"/>
                            <span>Blog Categories</span>
                        </a>
                    </Link>
                </li>
                <li className={`${classes.SidebarListItem}  nav-item`}>
                    <Link href={`/admin2/crud/category-tag`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-paragraph"/>
                            <span> Blog Tags</span>
                        </a>
                    </Link>
                </li>
                <li className={`${classes.SidebarListItem} nav-item`}>
                    <Link href={`/admin2/crud/blog`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-bar-chart"/>
                            <span>Write a blog</span>
                        </a>
                    </Link>
                </li>
                <li className={`${classes.SidebarListItem} nav-item`}>

                    <Link href={`/admin2/crud/blogs`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-bar-chart"/>
                            <span>Update/Delete Blog</span>
                        </a>
                    </Link>
                </li>

                <li className={classes.NavHeading}>Pages</li>
                <li className={`${classes.SidebarListItem} ${classes.active} nav-item`}>
                    <Link href={`/admin2/crud/home`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-grid"/>
                            <span>Home page</span>
                        </a>
                    </Link>
                </li>

                <Accordion as='li' className={`${classes.SidebarListItem} nav-item`}>
                    <CustomToggle eventKey="0">
                        <i className="bi bi-journal-text"/><span>Medical Services</span>
                        <i className={chevronClass.join(' ')}/>
                    </CustomToggle>

                    <Accordion.Collapse eventKey="0" as='ul' className={classes.NavContent}>
                        <>
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i><span>Form Elements</span>
                                </a>
                            </li>
                        </>
                    </Accordion.Collapse>
                    {/*<Accordion.Collapse eventKey='0'>*/}
                    {/*    <ul className="nav-content collapse ">*/}
                    {/*        <li>*/}
                    {/*            <a href="forms-elements.html">*/}
                    {/*                <i className="bi bi-circle"></i><span>Form Elements</span>*/}
                    {/*            </a>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}

                    {/*</Accordion.Collapse>*/}
                </Accordion>

                <li className={`${classes.SidebarListItem}  nav-item`}>
                    <Link href={`/`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-reply"/>
                            <span>Feedback</span>
                        </a>
                    </Link>
                </li>
                <li className={classes.NavHeading}>Staff</li>
                <li className={`${classes.SidebarListItem}  nav-item`}>
                    <Link href={`/`}>
                        <a className={`nav-link ${classes.NavLink}`}>
                            <i className="bi bi-briefcase"/>
                            <span>Manage</span>
                        </a>
                    </Link>
                </li>
            </ul>
        </aside>
    )
        ;
};

export default AdminSidebar;