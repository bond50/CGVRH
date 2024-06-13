// import {useState, useEffect} from 'react';
// import {YearsOperated} from "../../years-operated/YearsOperated";
// import Link from "next/link";
// import {Icon} from "@iconify/react";
//
// const Top = ({blog}) => {
//     const trendingLinks = [
//         {url: '/blog/title1', title: 'First Trending Blog'},
//         {url: '/blog/title2', title: 'Second Trending Blog'},
//         {url: '/blog/title3', title: 'Third Trending Blog'},
//         {url: '/blog/title4', title: 'Fourth Trending Blog'},
//         {url: '/blog/title5', title: 'Fifth Trending Blog'},
//         {url: '/blog/title6', title: 'Sixth Trending Blog'},
//         {url: '/blog/title7', title: 'Seventh Trending Blog'},
//         {url: '/blog/title8', title: 'Eighth Trending Blog'},
//         {url: '/blog/title9', title: 'Ninth Trending Blog'},
//         {url: '/blog/title10', title: 'Tenth Trending Blog'},
//     ];
//
//     const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentLinkIndex((prevIndex) => (prevIndex + 1) % trendingLinks.length);
//         }, 10000); // Adjust the duration to match the animation timing
//
//         return () => clearInterval(interval);
//     }, [trendingLinks.length]);
//
//     return (
//         <section id="top-bar" className={`${blog ? 'blog-bar' : ''} d-flex align-items-center`}>
//             <div className="container d-flex justify-content-center justify-content-md-between">
//                 {!blog && (
//                     <>
//                         <div className="contact-info d-flex align-items-center">
//                             <i className="bi bi-clock-fill d-flex align-items-center">
//                                 <span>A Legacy of <YearsOperated/> Years in Quality Care</span>
//                             </i>
//                             <i className="bi bi-envelope-check-fill d-flex align-items-center ms-4 custom-margin">
//                                 <a href="mailto:info@vihigahospital.go.ke">info@vihigahospital.go.ke</a>
//                             </i>
//                             <i className="bi bi-phone-fill d-flex align-items-center ms-4 custom-margin">
//                                 <span>+254723103564</span>
//                             </i>
//                             <i className="bi bi-clock d-flex align-items-center ms-4 custom-margin">
//                                 <span>Open 24/7</span>
//                             </i>
//                         </div>
//                         <div className="social-links d-flex align-items-center">
//                             <a href="https://www.facebook.com/profile.php?id=100063774356598" className="facebook">
//                                 <i className="bi bi-facebook"></i>
//                             </a>
//                         </div>
//                     </>
//                 )}
//                 {blog && (
//                     <div className="trending">
//                         <Icon icon="material-symbols:lightning-stand-outline-rounded" className='icon'/>
//
//                         <span>Trending</span>
//                         <div className="line"></div>
//                         <div className="links-wrapper">
//                             <ul>
//                                 {trendingLinks.map((link, index) => (
//                                     <li key={index} className={currentLinkIndex === index ? 'show' : ''}>
//                                         <Link href={link.url}>
//                                             <a>{link.title}</a>
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };
//
// export default Top;
import {useState, useEffect} from 'react';
import {YearsOperated} from "../../years-operated/YearsOperated";
import Link from "next/link";
import {Icon} from "@iconify/react";

const Top = ({blog}) => {
    const trendingLinks = [
        {url: '/blog/title1', title: 'First Trending Blog'},
        {url: '/blog/title2', title: 'Second Trending Blog'},
        {url: '/blog/title3', title: 'Third Trending Blog'},
        {url: '/blog/title4', title: 'Fourth Trending Blog'},
        {url: '/blog/title5', title: 'Fifth Trending Blog'},
        {url: '/blog/title6', title: 'Sixth Trending Blog'},
        {url: '/blog/title7', title: 'Seventh Trending Blog'},
        {url: '/blog/title8', title: 'Eighth Trending Blog'},
        {url: '/blog/title9', title: 'Ninth Trending Blog'},
        {url: '/blog/title10', title: 'Tenth Trending Blog'},
    ];

    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLinkIndex((prevIndex) => (prevIndex + 1) % trendingLinks.length);
        }, 10000); // Adjust the duration to match the animation timing

        return () => clearInterval(interval);
    }, [trendingLinks.length]);

    return (
        <section id="top-bar" className={`${blog ? 'blog-bar' : ''} d-flex align-items-center`}>
            <div className="container d-flex justify-content-center justify-content-md-between">
                {!blog && (
                    <>
                        <div className="contact-info d-flex align-items-center">
                            <i className="bi bi-clock-fill d-flex align-items-center">
                                <span><YearsOperated/> Years of service</span>
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
                        <div className="social-links d-flex align-items-center">
                            <a href="https://www.facebook.com/profile.php?id=100063774356598" className="facebook">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </div>
                    </>
                )}
                {blog && (
                    <div className="trending">
                        <Icon icon="material-symbols:lightning-stand-outline-rounded" className='icon'/>
                        <span>Trending</span>
                        <div className="line"></div>
                        <div className="links-wrapper">
                            <ul>
                                {trendingLinks.map((link, index) => (
                                    <li key={index} className={currentLinkIndex === index ? 'show' : ''}>

                                        <Link href={link.url}>
                                            <a>{link.title}</a>
                                        </Link>
                                         <Icon icon="material-symbols:chevron-right" className="arrow-icon"/>
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
