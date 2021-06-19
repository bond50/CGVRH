import classes from '../../styles/Hero.module.css'
import Link from "next/link";

const Hero = () => (

    <section className={`d-flex align-items-center ${classes.Hero}`}>
        <div className={`container ${classes.Container}`} data-aos='zoom-out' data-aos-once='true'>
            <h1>Welcome To </h1>
            <p>Vihiga County Referral Hospital</p>
            <h2>We take care of your precious health</h2>
            <Link href="/">
                <a className={`${classes.Btn}`}>Get started</a>
            </Link>

        </div>
    </section>

);

export default Hero;