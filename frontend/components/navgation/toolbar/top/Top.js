import { useState, useEffect } from 'react';
import Link from "next/link";
import { Icon } from "@iconify/react";
import { YearsOperated } from "../../../years-operated/YearsOperated";
import { listTrending } from "../../../../actions/blog";
import styles from '../../../../styles/Top.module.css';

const Top = ({ blog }) => {
    const [trendingLinks, setTrendingLinks] = useState([]);
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        let isMounted = true; // To track if the component is still mounted

        // Fetch trending blogs
        listTrending().then(data => {
            if (isMounted) {
                setTrendingLinks(data.map(blog => ({
                    url: `/blog/${blog.slug}`,
                    title: blog.title
                })));
            }
        }).catch(err => console.log(err));

        // Set interval for rotating trending blogs
        const interval = setInterval(() => {
            setCurrentLinkIndex((prevIndex) => (prevIndex + 1) % trendingLinks.length);
        }, 10000); // Adjust the duration to match the animation timing

        // Cleanup function
        return () => {
            isMounted = false; // Mark component as unmounted
            clearInterval(interval); // Clear the interval
        };
    }, [trendingLinks.length]);

    return (
        <section id={styles['top-bar']} className={`${blog ? styles['blog-bar'] : ''} d-flex align-items-center`}>
            <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                {!blog && (
                    <>
                        <div className={`${styles['contact-info']} d-flex align-items-center`}>
                            <i className="bi bi-clock-fill d-flex align-items-center">
                                <span><YearsOperated /> Years of service</span>
                            </i>
                            <i className="bi bi-envelope-check-fill d-flex align-items-center ms-4 custom-margin">
                                <a href="mailto:info@vihigahospital.go.ke">info@vihigahospital.go.ke</a>
                            </i>
                            <i className="bi bi-phone-fill d-flex align-items-center ms-4 custom-margin">
                                <span>+254723103564</span>
                            </i>
                            <i className="bi bi-clock d-flex align-items-center ms-4 custom-margin">
                                <span>Open 24/7</span>
                            </i>
                        </div>
                        <div className={`${styles['social-links']} d-flex align-items-center`}>
                            <a href="https://www.facebook.com/profile.php?id=100063774356598" className="facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </div>
                    </>
                )}
                {blog && (
                    <div className={styles.trending}>
                        <Icon icon="material-symbols:lightning-stand-outline-rounded" className={styles.icon} />
                        <span>Trending</span>
                        <div className={styles.line}></div>
                        <div className={styles['links-wrapper']}>
                            <ul>
                                {trendingLinks.map((link, index) => (
                                    <li key={index} className={currentLinkIndex === index ? styles.show : ''}>
                                        <Link href={link.url}>
                                            <a>{link.title}</a>
                                        </Link>
                                        <Icon icon="material-symbols:chevron-right" className={styles['arrow-icon']} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Top;
