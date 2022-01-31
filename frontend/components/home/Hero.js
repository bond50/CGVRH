import {Carousel} from "react-bootstrap";
import {useState} from "react";
import Link from "next/link";
import {API} from "../../config";
import renderHTML from "react-render-html";

function ControlledCarousel({data}) {
    const [index, setIndex] = useState(0);
    const [nextIcon, setNextIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-right"
                                                   aria-hidden="true"/>);
    const [prevIcon, setPrevIcon] = useState(<span className="carousel-control-next-icon bi bi-chevron-left"
                                                   aria-hidden="true"/>);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const renderCarouselItem = () => {

        return data && data.map(d => {
            const sectionStyle = {
                backgroundImage: `url(${API}/service/photo/${d.slug})`
            }

            return <Carousel.Item key={d._id} className='carousel-item ' style={sectionStyle}>
                <div className="carousel-container ">
                    <div className="carousel-content animate__animated animate__fadeInUp">
                        <h2 className="animate__animated animate__fadeInDown">{d.title.toLowerCase()}</h2>
                        {renderHTML(d.excerpt)}

                        <Link href={`/services/${d.slug}`}>
                            <a className="btn-get-started">Read
                                More
                            </a>
                        </Link>
                    </div>
                </div>
            </Carousel.Item>
        })

    }
    return (
        <section id='hero'>
            <Carousel
                activeIndex={index} onSelect={handleSelect} variant="dark"
                nextLabel=''
                prevLabel=''
                nextIcon={data.length && data.length > 1 && nextIcon}
                prevIcon={data.length && data.length > 1 &&prevIcon}>
                {renderCarouselItem()}
            </Carousel>
        </section>

    );
}

export default ControlledCarousel