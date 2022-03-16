import styles from "../../styles/Util.module.css";
import Link from "next/link";
import classes from '../../styles/RecenntFromBlog.module.css'
import {API} from "../../config";
import renderHTML from "react-render-html";
import Image from "next/image";

const ServiceList = ({services}) => {
    const showServices = () => {
        return services.map((service, index) => {
            const myLoader = () => {
                return `${API}/service/photo/${service.slug}`;
            }
            return <div className="col-lg-3" key={index} data-aos="fade-up" data-aos-delay='200' data-aos-once='true'>
                <Link href={`/services/${service.slug}`}>
                    <div className={classes.PostBox}>
                        <div className={classes.PostImg}>
                            <Image
                                loader={myLoader}
                                src={`${API}/service/photo/${service.slug}`}
                                className="img-fluid"
                                width={540}
                                height={360}
                                alt={service.title}/>
                        </div>
                        <h3 className={classes.PostTitle}>
                            {renderHTML(service.title.toLowerCase())}
                        </h3>
                    </div>
                </Link>
            </div>
        })
    }


    return (
        <section className={`${styles.Section}`}>
            {services.length <= 0 ? <div className='container'>
                <h5> No Service at the moment please login to add a Service</h5>
            </div> : <div className="container" data-aos="fade-up" data-aos-once='true'>
                <header className={styles.SectionTitle}>
                    <h2>SERVICES</h2>
                    <p>the hospital and its staff is committed to provide high quality health care services to all
                        patients/clients with dignity , professionalism and within the shortest time possible</p>
                </header>
                <div className="row">
                    {showServices()}
                </div>
            </div>}
        </section>

    )
}

export default ServiceList;