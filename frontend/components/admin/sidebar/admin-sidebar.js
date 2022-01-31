import classes from './admin-sidebar.module.css'
import Link from 'next/link'
import React from "react";
import Accordion2 from "../../reusables/Accordion2";
import {accordionFunction} from "../../reusables/functions/admin-accordion";
import AdminSidebarLink from "../../reusables/ui/admin-Sidebar-link";
import Admin from "../../auth/Admin";


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
    const downloadList = [
        {title: 'Upload', slug: 'upload-files'},
        {title: 'Tags', slug: 'document-tag'},
    ]
    const galleryList = [
        {title: 'Upload', slug: 'upload-images'},
        {title: 'Tags', slug: 'gallery-tag'},
    ]


    const userList = [
        {title: 'Add new user', slug: 'users/user'},
        {title: 'Manage existing users', slug: 'users'},
    ]

    return (
        <Admin>
            <aside className={attachedClasses.join(' ')}>
                <ul className={classes.SidebarList}>
                    <li className={classes.NavHeading}>Dashboard</li>
                    <AdminSidebarLink
                        title={'Admin home'}
                        slug={''}
                        icon={'house'}
                    />
                    <li
                        className={classes.NavHeading}>Pages
                    </li>
                    <AdminSidebarLink
                        title={'Home page'}
                        slug={''} icon={'grid'}/>
                    <Accordion2
                        title='Blog'
                        icon='journal-album'>
                        <>
                            {accordionFunction(blogList)}
                        </>
                    </Accordion2>
                    {/*<Accordion2 title='Main site pages' icon='journal'>*/}
                    {/*    <>*/}
                    {/*        {accordionFunction(serviceList)}*/}
                    {/*    </>*/}
                    {/*</Accordion2>*/}
                    <li className={classes.NavHeading}>Media</li>
                    <Accordion2 title='Downloads' icon='journal'>
                        <>
                            {accordionFunction(downloadList)}
                        </>
                    </Accordion2>
                    <Accordion2 title='Gallery' icon='journal'>
                        <>
                            {accordionFunction(galleryList)}
                        </>
                    </Accordion2>
                    <li className={classes.NavHeading}>Staff</li>

                    <Accordion2 title='Users' icon='journal'>
                        <>
                            {accordionFunction(userList)}
                        </>
                    </Accordion2>
                </ul>
            </aside>
        </Admin>
    )
};

export default AdminSidebar;