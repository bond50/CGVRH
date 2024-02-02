import {YearsOperated} from "../../years-operated/YearsOperated";


const Top = () => (
        <section id="top-bar" className="d-flex align-items-center">
            <div className="container d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center">
                    <i className="bi bi-clock-fill d-flex align-items-center"><span>A Legacy of <YearsOperated/> Years in Quality Care</span></i>
                    <i className="bi bi-envelope-check-fill d-flex align-items-center ms-4 custom-margin"><a
                        href="mailto:info@vihigahospital.go.ke">info@vihigahospital.go.ke</a>
                    </i>
                    <i className="bi bi-phone-fill d-flex align-items-center ms-4 custom-margin"><span>+254723103564</span></i>
                    <i className="bi bi-clock d-flex align-items-center ms-4 custom-margin"><span>Open 24/7</span></i>
                </div>
                <div className="social-links d-flex align-items-center">
                    <a href="https://www.facebook.com/profile.php?id=100063774356598" className="facebook"><i
                        className="bi bi-facebook"></i></a>
                </div>
            </div>
        </section>
    )
;

export default Top;