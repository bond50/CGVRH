import classes from './header.module.css'
import Link from "next/link";
import Search from "../Search";
import Image from "next/image";
import React from "react";
import BlogMegaWrapper from "./blog-mega-wrapper";

const Header = ({categories}) => {

    function showBlogMegaWrapper() {
        return categories.map(cat => {
            return <BlogMegaWrapper
                key={cat._id}
                categoryName={cat.name}
                slug={cat.slug}/>
        })
    }

    return (
        categories.length > 0 && < >

            {/*<div className='container'>*/}
            {/*    <div className={`${classes.Logo} me-auto`}>*/
            }
            {/*        <a href="index.html"><img src="/logo/logo.png" alt="" className="img-fluid"/></a>*/
            }
            {/*        <div className={`${classes.Header} me-auto `}>*/
            }
            {/*            <h1>Vihiga County Referral Hospital</h1>*/
            }
            {/*            <p>We take care of your precious health</p>*/
            }
            {/*        </div>*/
            }
            {/*        <Search/>*/
            }
            {/*    </div>*/
            }

            {/*</div>*/
            }

            <div className={`d-flex align-items-center  ${classes.Topbar}`}>
                <div className="container d-flex align-items-center justify-content-center justify-content-between">
                    <div className="align-items-center d-flex ">
                        <Link href={`/`}>
                            <a><Image src="/logo/logo.png" width={160} height={90} alt="" className="img-fluid"/></a>
                        </Link>
                    </div>
                    <Search/>
                </div>
            </div>

            <nav className={`${classes.Navbar}  `}>
                <div className='container'>
                    <ul className={` ${classes.Menu} `}>
                        <li className={classes.MenuItem}>
                            <Link href={'/blogs'}>
                                <a className={classes.Link}>Blog Home</a>
                            </Link>
                        </li>
                        {showBlogMegaWrapper()}
                    </ul>
                    <i className={`bi bi-list ${classes.MobileMenu}`}/>
                </div>
            </nav>

        </>

    )
        ;
};

export default Header;