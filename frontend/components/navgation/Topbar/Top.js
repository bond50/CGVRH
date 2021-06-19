import {YearsOperated} from "../../years-operated/YearsOperated";
import classes from '../../../styles/Top.module.css'

const Top = () => (

<section  className={`d-flex align-items-center ${classes.Topbar}`}>
    <div className="container d-flex justify-content-center justify-content-md-between">
         <div className={`${classes.SocialLinks} d-none d-md-flex align-items-center`}>
          <i className="bi bi-calendar2-check-fill m-1"/><YearsOperated/> Years of Quality Service
      </div>
      <div className={`${classes.ContactInfo}  d-flex align-items-center`}>
        <i className="bi bi-envelope-open-fill d-flex align-items-center"><a href="mailto:galavu10@gmail.com">galavu10@gmail.com</a></i>
        <i className="bi bi-phone d-flex align-items-center ms-4"><span>+254 723103564</span></i>
      </div>

    </div>
  </section>



);

export default Top;