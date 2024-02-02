import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";

const Breadcrumb = ({imageUrl, pageTitle}) => {
    const [breadcrumbs, setBreadcrumbs] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (router) {
            let linkPath = router.asPath.split('/');
            linkPath.pop();
            linkPath.shift();

            let last = router.asPath.substring(1).replaceAll(/-/g, ' ');
            if (linkPath.length > 0) {
                last = linkPath[linkPath.length - 1].replace(/-/g, ' ');
            }
            setBreadcrumbs(last);
        }
    }, [router]);

    const defaultImageUrl = '/home/imange.png';
    const containerStyle = {
        backgroundImage: `url('${imageUrl || defaultImageUrl}')`,
    };

    return (
        <div id="breadcrumbs" className='breadcrumbs d-flex align-items-center ' style={containerStyle}>
            <div className="container position-relative d-flex  align-items-center flex-column">
                <h1>{pageTitle ? pageTitle : breadcrumbs.toLowerCase()}</h1>
                <ol>
                    <li>
                        <Breadcrumbs/>
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb;
