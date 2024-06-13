import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Breadcrumb = ({pageTitle }) => {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (router) {
            const pathWithoutQuery = router.asPath.split('?')[0]; // Remove query params if any
            const linkPath = pathWithoutQuery.split('/');
            linkPath.shift(); // Remove the empty string at the start

            const breadcrumbPaths = linkPath.map((path, index) => {
                return {
                    breadcrumb: path.replace(/-/g, ' '),
                    href: '/' + linkPath.slice(0, index + 1).join('/')
                };
            });

            setBreadcrumbs(breadcrumbPaths);
        }
    }, [router]);

    const defaultImageUrl = '/home/imange.png';
    const containerStyle = {
        backgroundImage: `url('${defaultImageUrl}')`,
    };

    return (
        <div id="breadcrumbs" className='breadcrumbs d-flex align-items-center ' style={containerStyle}>
            <div className="container position-relative d-flex align-items-start flex-column">
                <h1>{pageTitle ? pageTitle : breadcrumbs[breadcrumbs.length - 1]?.breadcrumb.toLowerCase()}</h1>
                <ol>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index}>
                            <Link href={breadcrumb.href}>
                                <a>{breadcrumb.breadcrumb}</a>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb;
