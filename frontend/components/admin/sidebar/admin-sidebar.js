import classes from './admin-sidebar.module.css'
import Link from 'next/link'
import React from "react";
import Accordion2 from "../../reusables/Accordion2";
import {accordionFunction} from "../../reusables/functions/admin-accordion";
import AdminSidebarLink from "../../reusables/ui/admin-Sidebar-link";


const AdminSidebar = ({closed}) => {
    let attachedClasses = [classes.Sidebar, classes.CloseMobile];

    if (closed) {
        attachedClasses = [classes.Sidebar, classes.Close];
    }
    const blogList = [
        {title: 'Categories', slug: 'category-tag'},
        {title: 'Tags', slug: 'category-tag'},
        {title: 'Write a blog', slug: 'blog'},
        {title: 'Update/delete a blog', slug: 'blogs'},
    ]
    const serviceList = [
        {title: 'Categories', slug: 'page-category-tag'},
        {title: 'Tags', slug: 'page-category-tag'},
        {title: 'Create  page', slug: 'gen-page/service'},
        {title: 'Update/delete a page', slug: 'generated-page'},
    ]

    return (
        <aside className={attachedClasses.join(' ')}>
            <ul className={classes.SidebarList}>
                <li className={classes.NavHeading}>Dashboard</li>
                <AdminSidebarLink title={'Admin home'} slug={''} icon={'house'}/>
                <li className={classes.NavHeading}>Pages</li>
                <AdminSidebarLink title={'Home page'} slug={''} icon={'grid'}/>
                <Accordion2 title='Blog' icon='journal-album'>
                    <>
                        {accordionFunction(blogList)}
                    </>
                </Accordion2>
                <Accordion2 title='Main site pages' icon='journal'>
                    <>
                        {accordionFunction(serviceList)}
                    </>
                </Accordion2>
                <li className={classes.NavHeading}>Staff</li>
               <AdminSidebarLink title='Manage users' icon='brief-case' slug=''/>
            </ul>
        </aside>
    )
};

export default AdminSidebar;