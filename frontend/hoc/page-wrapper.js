import Link from "next/link";
import React from "react";
import {Icon} from "@iconify/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {API} from "../config";
import {fetcher} from "../axios/axios";
import AdBanner from "../components/adsense/AdBanner";

const PageWrapper = ({related = [], children, title, projectPage}) => {
    const router = useRouter();
    const {data: files, error} = useSWR(`${API}/get-downloads`, fetcher);

    // Helper function to truncate filenames
    const truncateFileName = (fileName, maxLength = 25) => {
        if (fileName.length > maxLength) {
            return fileName.substring(0, maxLength) + '...';
        }
        return fileName;
    };

    // Helper function to get the file extension and corresponding icon
    const getFileIcon = (filePath) => {
        const extension = filePath.split('.').pop().toLowerCase();
        let icon;
        switch (extension) {
            case 'pdf':
                icon = 'dashicons:pdf';
                break;
            case 'doc':
            case 'docx':
                icon = 'mingcute:doc-line';
                break;
            case 'xls':
            case 'xlsx':
                icon = 'bi:file-earmark-spreadsheet';
                break;
            default:
                icon = 'bi:file-earmark';
        }
        return icon;
    };

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
                                                <Icon icon="bi:arrow-right-circle" className="icon"/>
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
                                {files?.map(file => {
                                    const icon = getFileIcon(file.filePath);
                                    return (
                                        <Link href={file.filePath} key={file.publicId}>
                                            <a>
                                                <Icon icon={icon} className="icon"/>
                                                <span>{truncateFileName(file.fileName)}</span>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="help-box d-flex flex-column justify-content-center align-items-center">
                            <i className="bi bi-headset help-icon"></i>
                            <h4>Have a Question?</h4>
                            <p className="d-flex align-items-center mt-2 mb-0">
                                <i className="bi bi-telephone me-2"></i>
                                <span>+254 723 103 564</span>
                            </p>
                            <p className="d-flex align-items-center mt-1 mb-0">
                                <i className="bi bi-envelope me-2"></i>
                                <a href="mailto:info@vihihigahospital.go.ke">info@vihihigahospital.go.ke</a>
                            </p>
                            <h4>Ward visiting Hours</h4>
                            <ul>
                                <li>6:00 AM - 7:00AM</li>
                                <li>1:00 PM - 2:00PM</li>
                                <li>5:00 PM - 6:00PM</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8 ps-lg-5 order-lg-2 order-1">
                        <AdBanner/>
                        {children}
                        <AdBanner/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageWrapper;
