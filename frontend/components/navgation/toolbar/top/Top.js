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
        <section className={`${styles.topBar} ${blog ? styles.blogBar : ''} d-flex align-items-center`}>
            <div className="container d-flex flex-column flex-md-row justify-content-center justify-content-md-between">
                {!blog && (
                    <>
                        <div className={`${styles.contactInfo} d-flex align-items-center`}>
                            <Icon icon="memory:clock-fill" className={`d-flex align-items-center`} />
                            <span><YearsOperated /> Years of service</span>
                            <Icon icon="bi:envelope-check-fill" className="d-flex align-items-center ms-4" />
                            <a href="mailto:info@vihigahospital.go.ke">info@vihigahospital.go.ke</a>
                            <Icon icon="bi:phone-fill" className="d-flex align-items-center ms-4 " />
                            <span>+254723103564</span>
                            <Icon icon="bi:clock" className="d-flex align-items-center ms-4" />
                            <span>Open 24/7</span>
                        </div>
                        <div className={`${styles.socialLinks} d-flex align-items-center`}>
                            <a href="https://www.facebook.com/profile.php?id=100063774356598" className="facebook">
                                <Icon icon="bi:facebook" />
                            </a>
                        </div>
                    </>
                )}
                {blog && (
                    <div className={styles.trending}>
                        <Icon icon="material-symbols:lightning-stand-outline-rounded" className={styles.icon} />
                        <span>Trending</span>
                        <div className={styles.line}></div>
                        <div className={styles.linksWrapper}>
                            <ul>
                                {trendingLinks.map((link, index) => (
                                    <li key={index} className={currentLinkIndex === index ? styles.show : ''}>
                                        <Link href={link.url}>
                                            <a>{link.title}</a>
                                        </Link>
                                        <Icon icon="material-symbols:chevron-right" className={styles.arrowIcon} />
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
