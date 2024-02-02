import React from 'react';
import Image from "next/image";
import {APP_NAME} from "../../config";

const Emergency = () => {
    return (
        <div className="emergency-area">
            <div className="row g-0">
                <div className="col-lg-6">
                    <Image src="/herp.jpg" alt="" className="img-fluid" width={2048} height={1536}/>
                </div>
                <div className="col-lg-6 work-right-text d-flex align-items-center">
                    <div className="px-5 py-5 py-lg-0">
                        <h2>In an Emergency?</h2>
                        <p> In the event of an emergency, {`${APP_NAME} 's`} Emergency Unit operates
                            around the clock, 24/7. Should you require immediate assistance, kindly utilize the {`"Call
                            Now"`} button to connect with our dedicated emergency response team. If, for any reason, the
                            button is not operational, please promptly contact us directly
                            at <span>+254 723103564</span>. Your
                            safety and well-being are our top priorities, and we are here to provide swift and
                            professional assistance during urgent situations.</p>
                        <a href="#contact" className="ready-btn scrollto">Contact us</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emergency;