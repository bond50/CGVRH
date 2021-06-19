import Breadcrumbs from 'nextjs-breadcrumbs';
import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import classes from '../../styles/Breadcrumbs.module.css'


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
        <section className={classes.Breadcrumbs}>
            <div className="container">
                <div className={`d-flex justify-content-between  align-items-center ${classes.Block}`}>
                    <h2>{breadcrumbs.toUpperCase()}</h2>
                    <ol>
                        <li>
                            <Breadcrumbs useDefaultStyle  />
                        </li>
                    </ol>
                </div>
            </div>

        </section>
    );
};

export default Breadcrumb;