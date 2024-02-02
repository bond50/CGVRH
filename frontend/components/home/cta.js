import {APP_NAME} from "../../config";

const Cta = () => {
    return (
        <section className='cta'>
            <div className="container" data-aos="zoom-in">
                <div className="row">
                    <div className="col-lg-9 text-center text-lg-start">
                        <h3 className="cta-title">In an emergency?
                        </h3>
                        <p className='cta-text'>
                            In the event of an emergency, {`${APP_NAME} 's`} Emergency Unit operates
                            around the clock, 24/7. <br/>Should you require immediate assistance,
                            kindly utilize the <span>Call Now</span> button to connect with our dedicated emergency response team. <br/>If, for any reason, the
                            button is not operational, please promptly contact us directly
                            at <span>0723103564</span>. Your
                            safety and well-being are our top priorities, and we are here to provide swift and
                            professional assistance during urgent situations.
                        </p>
                    </div>
                    <div className={`col-lg-3 cta-btn-container text-center`}>
                        <a className={`cta-btn align-middle`} href="tel:+254723103564">Call Now</a>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default Cta;