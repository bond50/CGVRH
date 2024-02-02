import {Icon} from "@iconify/react";
import React from "react";

const CoreValues = () => {
    const list = [
        {
            title: 'Vision',
            classname: '',
            icon: 'mdi-eye',
            link: '/about/vision',
            para: ' A model health institution dedicated to evidence based Patient care,Training and Research'
        },
        {
            title: 'Mission',
            icon: 'mdi-rocket',
            link: '/about/mission',
            classname: 'mt-4 mt-md-0',
            para: 'To provide specialized intergrated client centered health services through training, research and collaboration to improve quality of lives'
        },
        {
            title: 'Core values',
            icon: 'mdi-lightbulb-on',
            classname: 'mt-4 mt-lg-0',
            link: '/about/core-values',
            para: 'Patient first,Integrity,Professionalism, Teamwork, Inclusivity',

        },
    ]

 const renderList = () => {
    return list.map((item, index) => {
      if (item.title === 'Core values') {
        // Split the values and render them as a list
        const coreValuesList = item.para.split(',').map((value, i) => (
          <li key={i}>
            <Icon icon="ri:check-double-line" className="ico1" /> {value.trim()}
          </li>
        ));

        return (
          <div
            key={index}
            className={`col-xl-4 col-md-6 d-flex align-items-stretch ${item.classname}`}
            data-aos="zoom-in"
            data-aos-delay={`${(1 + index) * 100}`}
          >
            <div className="icon-box w-100">
              <div className="icon">
                <Icon icon={item.icon} className="ico" />
              </div>
              <h4>
                {item.title}
              </h4>
              <ul>{coreValuesList}</ul>
            </div>
          </div>
        );
      } else {

        return (
          <div
            key={index}
            className={`col-xl-4 col-md-6 d-flex align-items-stretch ${item.classname}`}
            data-aos="zoom-in"
            data-aos-delay={`${(1 + index) * 100}`}
          >
            <div className="icon-box w-100">
              <div className="icon">
                <Icon icon={item.icon} className="ico" />
              </div>
              <h4>
                {item.title}
              </h4>
              <p>{item.para}</p>
            </div>
          </div>
        );
      }
    });
  };
    return (
        <section id="principles" className="principles section-bg">
            <div className="container" data-aos="fade-up">
                <div className="row">
                    {renderList()}
                </div>
            </div>
        </section>

    );
};

export default CoreValues;