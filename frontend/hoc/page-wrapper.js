import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

const PageWrapper = ({ related = [], children, title, projectPage }) => {
    const router = useRouter();

    // Sort the related array to ensure the active link is first
    const sortedRelated = related?.sort((a, b) => {
        const hrefA = projectPage ? `/media/projects/${a.slug}` : `/services/${a.slug}`;
        const hrefB = projectPage ? `/media/projects/${b.slug}` : `/services/${b.slug}`;
        const isActiveA = router.asPath === hrefA;
        const isActiveB = router.asPath === hrefB;
        return isActiveB - isActiveA;
    });

    return (
        <section className="page-wrapper">
            <div className="container">
                <div className="row gy-5">
                    <div className="col-lg-4 order-lg-1 order-2" data-aos="fade-up" data-aos-delay="100">
                        <div className="page-box">
                            <h4>{title}</h4>
                            <div className="page-list">
                                {sortedRelated?.map((pg) => {
                                    const href = projectPage ? `/media/projects/${pg.slug}` : `/services/${pg.slug}`;
                                    const isActive = router.asPath === href;
                                    return (
                                        <Link href={href} key={pg._id}>
                                            <a className={isActive ? "active" : ""}>
                                                <Icon icon="bi:arrow-right-circle" className="icon" />
                                                <span>{pg.title}</span>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="page-box">
                            <h4>Download Catalog</h4>
                            <div className="download-catalog">
                                <Link href="#">
                                    <a>
                                        <Icon icon="dashicons:pdf" className="icon" />
                                        <span>Catalog PDF</span>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Icon icon="mingcute:doc-line" className="icon" />
                                        <span>Catalog DOC</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="help-box d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-headset help-icon"></i>
                            <h4>Have a Question?</h4>
                            <p className="d-flex align-items-center mt-2 mb-0">
                                <i className="bi bi-telephone me-2"></i>
                                <span>+1 5589 55488 55</span>
                            </p>
                            <p className="d-flex align-items-center mt-1 mb-0">
                                <i className="bi bi-envelope me-2"></i>
                                <a href="mailto:contact@example.com">contact@example.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8 ps-lg-5 order-lg-2 order-1">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageWrapper;
