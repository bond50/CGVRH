import React from 'react';
import { APP_NAME } from '../../config';
import History from './History';
import Plan from './Plan';
import Role from './Role';
import Hr from './HR';
import StrategicObj from './StrategicObj';
import Population from './Population';
import Accordion from '../reusables/Accordion';
import styles from '../../styles/AboutUs.module.css';

const Index = () => {
    const list = [
        {
            eventKey: '1',
            title: 'History:',
            comp: <History />,
        },
        {
            eventKey: '2',
            title: 'Population Impact:',
            comp: <Population />,
        },
        {
            eventKey: '3',
            title: 'Human Resource:',
            comp: <Hr />,
        },
        {
            eventKey: '4',
            title: 'Strategic Objective:',
            comp: <StrategicObj />,
        },
        {
            eventKey: '5',
            title: 'Strategic Plan (2018-2022):',
            comp: <Plan />,
        },
        {
            eventKey: '6',
            title: 'Roles and services:',
            comp: <Role />,
        },
    ];

    return (
        <>
            <section>
                <div className="container" data-aos="fade-up">
                    <div className="row position-relative">
                        <div
                            className={`col-lg-7 ${styles.aboutImg}`}
                            style={{ backgroundImage: 'url(/home/strategic.jpg)' }}
                        ></div>

                        <div className="col-lg-7">
                            <h2 className={styles.header2}>{APP_NAME}</h2>
                            <div className={styles.ourStory}>
                                <h4 className={styles.header4}>Since 2001</h4>
                                <Accordion list={list} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
