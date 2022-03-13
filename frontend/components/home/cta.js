import classes from '../../styles/cta.module.css'


const Cta = () => {
    return (
        <section className={classes.cta}>
            <div className="container" data-aos="zoom-in">
                <div className="row">
                    <div className="col-lg-9 text-center text-lg-start">
                        <h3>In an emergency? Need help now?
                        </h3>
                        <p>VCRH Emergency unit operates on 24/7 basis. In case of an emergency tap Call Now button
                            to speak to emergency team. If the button is not working,
                            call <span>+254 723103564</span> now
                        </p>
                    </div>
                    <div className={`col-lg-3 ${classes.btnContainer} text-center`}>
                        <a className={`${classes.btn} align-middle`} href="tel:+254723103564">Call Now</a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Cta;