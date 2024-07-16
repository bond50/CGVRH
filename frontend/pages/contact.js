import dynamic from "next/dynamic";
import {SITE_URL} from "../config";
import Preloader from "../components/preloader";
import SEOHead from "../components/SEOHead";
import axiosInstance from "../axios/axios";
const Layout = dynamic(() => import("../hoc/Layout"), { ssr: false, loading: () => <Preloader /> });
const ContactForm = dynamic(() => import("../components/form/ContactForm"), { ssr: false, loading: () => <Preloader /> });

const Contact = ({seoSettings}) => {

      const {
        author,
        description,
        imageUrl,
        keywords,
        locale,
        themeColor,
        title,
    } = seoSettings[0];


    const additionalStructuredData = [
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vihiga County Referral Hospital",
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dwtcilinl/image/upload/v1713525251/vc150_ti3ywx.png"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-723-103564",
                "contactType": "Customer Service",
                "areaServed": "KE",
                "availableLanguage": "en"
            },
            "sameAs": [
                "https://www.facebook.com/profile.php?id=100063774356598"
            ]
        }
    ];


    return (
        <>
             <SEOHead
                title={title}
                description={description}
                url={`${SITE_URL}/contact`}
                imageUrl={imageUrl}
                keywords={keywords}
                author={author}
                additionalStructuredData={additionalStructuredData}
                locale={locale}
                themeColor={themeColor}
            />
            <Layout>
                <ContactForm />
            </Layout>
        </>
    );
};


export async function getStaticProps() {
    const res = await axiosInstance.get(`/contact-page-seo`);
    const seoSettings = await res.data;

    return {
        props: {
            seoSettings,
        },
    };
}
export default Contact;
