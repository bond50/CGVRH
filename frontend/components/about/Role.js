import React from 'react';
import { APP_NAME } from "../../config";
import { Icon } from "@iconify/react";
import Link from "next/link";

const services = [
    { name: "internal medicine", href: "/services/internal-medicine" },
    { name: "general surgery", href: "/services/precision-and-expertise-in-surgical-care" },
    { name: "pediatrics", href: "/services/pediatrics" },
    { name: "obstetrics and gynecology", href: "/services/comprehensive-women's-health-services" },
    { name: "dental services", href: "/services/dental-services" },
    { name: "psychiatry", href: "/services/psychiatry-services" },
    { name: "ophthalmology", href: "/services/ophthalmic-services" },
    { name: "pharmaceutical services", href: "/services/pharmacy" },
    { name: "ambulatory and emergency services", href: "/services/ambulance-services" },
    { name: "laboratory services", href: "/services/laboratory" },
    { name: "rehabilitative care", href: "/services/rehabilitative-care-services" },
    { name: "counseling", href: "/services/counseling-services" },
    { name: "physiotherapy", href: "/services/physiotherapy-services" },
    { name: "nutritional services", href: "/services/nutrition-services" },
    { name: "radiological imaging services", href: "/services/radiology-and-imaging-services" },
    { name: "oncology services", href: "/services/oncology-services" }
];

const Role = () => {
    return (
        <>
            <p>
                {APP_NAME} serves as a county referral hospital, an intermediary to national and teaching referral
                hospitals, and a center for specialized healthcare.
            </p>
            <p>The hospital actively engages in teaching and
                training healthcare personnel, offering a wide range of clinical services, and contributing to
                health research programs.</p>
            <p>Its specialized personnel and services cover:</p>
            <ul>
                {services.map((service, index) => (
                    <li key={index}>
                        <Icon icon="icon-park-outline:right-c" className="ico1"/>
                        <Link href={service.href}>{service.name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Role;
