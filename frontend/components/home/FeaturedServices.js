import renderHTML from "react-render-html";
import Link from "next/link";
import {API} from "../../config";
import useSWR from "swr";
import Preloader from "../preloader";
import ServiceCard from "../reusables/card/serviceCard/ServiceCard";


const FeaturedServices = ({className}) => {
    const {data: services, error} = useSWR(`${API}/featured-general`)
    if (error) return <div>failed to load</div>
    if (!services) return <Preloader/>

    return (

        <section className={className}>
            <div className="container">
                <div className={`section-title`} data-aos="zoom-out" data-aos-once='true'>
                    <h2>Featured Services</h2>
                </div>

                <div className="row gy-3">
                    {services && services.map((service, i) => {

                        let imgSrc = `${API}/general/photo/${service.slug}`
                        if (service.images && service.images.length && service.images.length > 0) {
                            const image = service.images[Math.floor(Math.random() * service.images.length)];
                            imgSrc = image.url
                        }


                        return <ServiceCard
                            title={service.title}
                            delay={`${i * 100}`}
                            href={`/general/${service.slug}`}
                            imgSrc={imgSrc}
                            imgAlt={service.title}
                            key={service._id}
                        >
                            {renderHTML(service.excerpt.length >= 100 ? `${service.excerpt.substring(0, 100)}...` : service.excerpt)}
                        </ServiceCard>

                    })}
                </div>
            </div>


        </section>


    );
};

export default FeaturedServices;