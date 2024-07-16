import React, { useEffect, useState } from "react";
import classes from './admin-sidebar.module.css';
import Accordion2 from "../../reusables/Accordion2";
import { accordionFunction } from "../../reusables/functions/admin-accordion";
import { isAuth } from "../../../actions/auth";
import SidebarLink from "../../reusables/ui/sidebar-link";
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from "next/router";

const AdminSidebar = ({ closed }) => {
    const [auth, setAuth] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setAuth(isAuth());
    }, []);

    const attachedClasses = [classes.Sidebar, closed ? classes.Close : classes.CloseMobile];

    const sidebarConfig = {
        user: [
            { heading: 'Dashboard', links: [{ title: 'Home', to: '', icon: 'mdi:home', type: 'private' }] },
            {
                heading: 'Quick links',
                links: [
                    { title: 'Website home page', to: '/', icon: 'mdi:home', quick: true },
                    { title: 'Blog section', to: '/blogs', icon: 'mdi:view-grid', quick: true }
                ]
            },
            {
                heading: 'Pages',
                accordions: [
                    {
                        title: 'Blog',
                        icon: 'mdi:book-open-page-variant',
                        items: [
                            { title: 'Write a blog', to: 'crud/blog' },
                            { title: 'Update/delete a blog', to: 'crud/blogs' }
                        ]
                    },
                    {
                        title: 'Pages',
                        icon: 'mdi:file-document-box',
                        items: [
                            { title: 'Create page', to: 'crud/gen-page/' },
                            { title: 'Update/delete a page', to: 'crud/gen-page/dynamic-pages' }
                        ]
                    },
                    {
                        title: 'Profile',
                        icon: 'mdi:account',
                        items: [{ title: 'Update', to: 'update' }]
                    }
                ]
            }
        ],
        admin: [
            {
                heading: 'Dashboard',
                links: [{ title: 'Admin home', to: '', icon: 'mdi:home', type: 'admin' }]
            },
            {
                heading: 'Quick links',
                links: [
                    { title: 'Website home page', to: '/', icon: 'mdi:home', quick: true },
                    {
                        title: 'Realtime Google Analytics',
                        to: 'https://analytics.google.com/analytics/web/#/p306834202/realtime/overview?params=_u..nav%3Dmaui',
                        icon: 'mdi:google-analytics',
                        external: true
                    },
                    { title: 'Blog section', to: '/blogs', icon: 'mdi:view-grid', quick: true }
                ]
            },
            {
                heading: 'Pages',
                links: [{ title: 'Customize Home page', to: 'home-customize', icon: 'mdi:home-edit', type: 'admin' }],
                accordions: [
                    {
                        title: 'Tenders',
                        icon: 'mdi:briefcase-outline',
                        items: [
                            { title: 'Upload/Add', slug: 'crud/tenders/create' },
                            { title: 'Manage Tenders', slug: 'crud/tenders' }
                        ]
                    },
                    {
                        title: 'Blog',
                        icon: 'mdi:book-open-page-variant',
                        items: [
                            { title: 'Categories', slug: 'crud/category-tag' },
                            { title: 'Tags', slug: 'crud/category-tag' },
                            { title: 'Write a blog', slug: 'crud/blog' },
                            { title: 'Update/delete a blog', slug: 'crud/blogs' }
                        ]
                    },
                    {
                        title: 'Pages',
                        icon: 'mdi:file-document-box-multiple-outline',
                        items: [
                            { title: 'Categories', slug: 'crud/gen-page/page-category' },
                            { title: 'Create page', slug: 'crud/gen-page/' },
                            { title: 'Update/delete a page', slug: 'crud/gen-page/dynamic-pages' }
                        ]
                    },
                    {
                        title: 'Certificate',
                        icon: 'mdi:certificate',
                        items: [
                            { title: 'Create', slug: 'crud/certificate/create' },
                            { title: 'List', slug: 'crud/certificate/list' }
                        ]
                    },
                    {
                        title: 'Downloads',
                        icon: 'mdi:download',
                        items: [
                            { title: 'Upload', slug: 'crud/upload-files' },
                            { title: 'Tags', slug: 'crud/document-tag' }
                        ]
                    },
                    {
                        title: 'Gallery',
                        icon: 'mdi:image-album',
                        items: [
                            { title: 'Upload', slug: 'crud/upload-images' },
                            { title: 'Tags', slug: 'crud/gallery-tag' }
                        ]
                    },
                    {
                        title: 'Project',
                        icon: 'mdi:briefcase-check',
                        items: [
                            { title: 'Create', slug: 'crud/projects/create' },
                            { title: 'Manage Projects', slug: 'crud/projects' }
                        ]
                    },
                    {
                        title: 'Users',
                        icon: 'mdi:account-multiple',
                        items: [
                            { title: 'Add HMT member', slug: 'crud/users/user' },
                            { title: 'Manage existing users', slug: 'crud/users' }
                        ]
                    },
                    {
                        title: 'SEO Head settings',
                        icon: 'mdi:search-web',
                        items: [
                            { title: 'Create SEO settings', slug: 'crud/seo/create' },
                            { title: 'Manage SEO settings', slug: 'crud/seo' }
                        ]
                    },
                    {
                        title: 'SEO Pages',
                        icon: 'mdi:file-document-box-multiple-outline',
                        items: [
                            { title: 'Create SEO Page', slug: 'crud/seopages/create' },
                            { title: 'Manage SEO Pages', slug: 'crud/seopages' }
                        ]
                    },
                    {
                        title: 'Profile',
                        icon: 'mdi:account-circle',
                        items: [{ title: 'Update', to: 'update' }],
                        type: 'private'
                    }
                ]
            }
        ]
    };

    const renderLinks = (links, basePath) =>
        links.map(link => {
            const fullPath = link.quick || link.external ? link.to : `${basePath}${link.to ? `/${link.to}` : ''}`;
            return (
                <SidebarLink
                    key={link.title}
                    title={link.title}
                    fullPath={fullPath}
                    icon={link.icon}
                    currentPath={router.pathname}
                    external={link.external} />
            );
        });

    const renderAccordions = (accordions, isPrivate) =>
        accordions.map(accordion => (
            <Accordion2
                key={accordion.title}
                title={accordion.title}
                icon={accordion.icon}
                currentPath={router.pathname}>
                {accordionFunction(accordion.items, isPrivate ? '/user' : '/admin2', router.pathname)}
            </Accordion2>
        ));

    const renderSidebar = (config, basePath) =>
        config.map(section => (
            <React.Fragment key={section.heading}>
                <li className={classes.NavHeading}>{section.heading}</li>
                {section.links && renderLinks(section.links, basePath)}
                {section.accordions && renderAccordions(section.accordions, section.accordions[0]?.type === 'private')}
            </React.Fragment>
        ));

    if (!auth) {
        return <div className={classes.SpinnerWrapper}><Spinner animation="border" /></div>;
    }

    const config = auth.role === 0 ? sidebarConfig.user : sidebarConfig.admin;
    const basePath = auth.role === 0 ? '/user' : '/admin2';

    return (
        <aside className={attachedClasses.join(' ')}>
            <ul className={classes.SidebarList}>
                {renderSidebar(config, basePath)}
            </ul>
        </aside>
    );
};

export default AdminSidebar;
