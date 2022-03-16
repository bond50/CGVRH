import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from "react";


const Breadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState('');

    const router = useRouter();

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.pop()
            linkPath.shift()

            const last = linkPath[linkPath.length - 1].replace(/-/g, ' ')
            setBreadcrumbs(last);
        }
    }, [router]);


    return (
        <section id="breadcrumbs" className='breadcrumbs'>
            <div className="container">
                <div className={`d-flex justify-content-between align-items-center`}>
                    <h2>{breadcrumbs.toLowerCase()}</h2>
                    <ol>
                        <li>
                            <Breadcrumbs useDefaultStyle/>
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;