import {Nav} from "react-bootstrap";
import Link from "next/link";
import React from "react";
import renderHTML from "react-render-html";
import Image from 'next/image'
import {API} from "../config";
import {useRouter} from "next/router";
import classes from '../styles/page-wrapper.module.css'


const PageWrapper = ({related, page}) => {
    const router = useRouter()

    let imgSrc = `${API}/general/photo/${page.slug}`

    if (page.images && page.images.length && page.images.length > 0) {
        const image = page.images[Math.floor(Math.random() * page.images.length)];
        imgSrc = image.url
    } else {
        imgSrc = `${API}/general/photo/${page.slug}`
    }

    const myLoader = () => {
        return imgSrc;
    }


    return (
        <>
            {/*<GeneralPageHeader*/}
            {/*    title={page.title}>*/}
            {/*</GeneralPageHeader>*/}
            <section>
                <div className="container">
                    <div className='row gy-4'>
                        <div className={'col-lg-3 order-2 order-lg-2'}>
                            {related.map(pg => {
                                return <Nav className={`flex-column `} key={pg.slug}>
                                    <li className={`nav-item `}>
                                        <Link href={`/general/${pg.slug}`}>
                                            <a className={`nav-link ${classes.NavLink} ${router.asPath === `/general/${pg.slug}/` ? classes.active : null}`}>{pg.title}</a>
                                        </Link>
                                    </li>
                                </Nav>
                            })}
                        </div>
                        <div className='col-lg-9  order-1 order-lg-2'>


                            <div className="row gy-4">
                                <div className={`col-lg-8 ${classes.Details} order-2 order-lg-1`}>
                                    <h1>{page.title}</h1>
                                    {renderHTML(page.body)}
                                </div>
                                <div className="col-lg-4 text-center order-1 order-lg-2">
                                    <Image
                                        loader={myLoader}
                                        className="img-fluid"
                                        width={1200}
                                        height={700}
                                        src={imgSrc}
                                        alt={page.title}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>
    )
        ;
};

export default PageWrapper;