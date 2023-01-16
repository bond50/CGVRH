import {APP_NAME} from "../../config";

const Cta = () => {
    return (
        <section className='cta'>
            <div className="container" data-aos="zoom-in">
                <div className="row">
                    <div className="col-lg-9 text-center text-lg-start">
                        <h3 className="cta-title">In an emergency? Need help now?
                        </h3>
                        <p className='cta-text'>{APP_NAME} Emergency unit operates on 24/7 basis. In case of an emergency tap Call Now button
                            to speak to emergency team. If the button is not working,
                            call <span>+254 723103564</span> now
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