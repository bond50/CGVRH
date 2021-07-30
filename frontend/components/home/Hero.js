import Link from "next/link";
import classes from '../../styles/Hero.module.css'

const Hero = () => (
    <section className={`${classes.Hero} d-flex align-items-center `}>
        <div className="container" data-aos="zoom-out" data-aos-delay="100">
            <div className="row">
                <div className="col-xl-6">
                    <h1>Vihiga county referral hospital </h1>
                    <h2>We take care of your precious health</h2>
                    <Link href={`/blogs`}>
                        <a className={classes.Btn}>Blog Section</a>
                    </Link>
                </div>
            </div>
        </div>

    </section>


);

export default Hero;