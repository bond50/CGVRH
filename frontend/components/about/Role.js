import React from 'react';
import {APP_NAME} from "../../config";
import {Icon} from "@iconify/react";


const Role = () => {


    return <>

        <p>
            {APP_NAME} serves as a county referral hospital, an intermediary to national and teaching referral
            hospitals, and a center for specialized healthcare.
        </p>
        <p>The hospital actively engages in teaching and
            training healthcare personnel, offering a wide range of clinical services, and contributing to
            health research programs.</p>
        <p>Its specialized personnel and services cover
            <ul>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />internal medicine</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />general surgery</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" /> pediatrics</li>
                <li> <Icon icon="icon-park-outline:right-c" className="ico1" />obstetrics and gynecology</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />dental services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />psychiatry</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />ophthalmology</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />pharmaceutical services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />ambulatory and emergency services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />laboratory services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />rehabilitative care</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />counseling</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />physiotherapy</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />nutritional services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />radiological imaging services</li>
                <li><Icon icon="icon-park-outline:right-c" className="ico1" />oncology services</li>
            </ul>
        </p>


    </>

};

export default Role;