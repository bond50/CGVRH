import {YearsOperated} from "../years-operated/YearsOperated";


const Top = () => (
    <section id="topbar" className="d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
                <i className="bi bi-calendar2-check-fill mx-1"/><span><YearsOperated/> Years of Quality Service </span>
            </div>
        </div>
    </section>

);

export default Top;