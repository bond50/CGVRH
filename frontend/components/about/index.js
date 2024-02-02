import React, {useState} from 'react';
import {APP_NAME} from '../../config';

import Accordion from 'react-bootstrap/Accordion';
import History from './History';
import Plan from './Plan';
import Role from './Role';
import Hr from './HR';
import StrategicObj from './StrategicObj';
import Population from "./Population";


const Index = () => {
    const [activeKey, setActiveKey] = useState('1'); // Initialize with the eventKey of the first item

    const handleAccordionToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    const list = [
        {
            eventKey: '1',
            title: 'History:',
            comp: <History/>,
        },


        {
            eventKey: '2',
            title: 'Population Impact:',
            comp: <Population/>,
        },
        {
            eventKey: '3',
            title: 'Human Resource:',
            comp: <Hr/>,
        },
        {
            eventKey: '4',
            title: 'Strategic Objective:',
            comp: <StrategicObj/>,
        },
          {
            eventKey: '5',
            title: 'Strategic Plan (2018-2022):',
            comp: <Plan/>,
        },
        {
            eventKey: '6',
            title: 'Roles and services:',
            comp: <Role/>,
        },
    ];

    return (
        <>
            <section id="about" className="about">
                <div className="container" data-aos="fade-up">
                    <div className="row position-relative">
                        <div
                            className="col-lg-7 about-img"
                            style={{backgroundImage: 'url(/home/strategic.jpg)'}}
                        ></div>

                        <div className="col-lg-7">
                            <h2>{APP_NAME}</h2>
                            <div className="our-story">
                                <h4>Since 2001</h4>
                                <div data-aos="fade-up">
                                    {list.map((item) => (
                                        <Accordion
                                            key={item.eventKey}
                                            activeKey={activeKey}
                                            onSelect={(eventKey) => handleAccordionToggle(eventKey)}
                                        >
                                            <Accordion.Item eventKey={item.eventKey}>
                                                <Accordion.Header>
                                                    <h3>
                                                        <span>{`0${item.eventKey}`}</span>
                                                        {item.title}
                                                    </h3>
                                                </Accordion.Header>
                                                <Accordion.Body>{item.comp}</Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Index;
