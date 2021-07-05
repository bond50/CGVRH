const Services = () => {
    const list = [
        {text: 'Special Clinics', href: '/services/clinics'},
        {text: 'Pharmacy', href: '/services/pharmacy'},
        {text: 'Laboratory', href: '/services/laboratory'},
        {text: 'Radiology/Xray', href: '/services/radiology'},
        {text: 'Accident And Emergency', href: '/services/casualty'},
        {text: 'ICU', href: '/services/icu'},
        {text: 'Ambulance', href: '/services/ambulance'},
        {text: 'Nursing Services', href: '/services/nursing'},
        {text: 'Health Records', href: '/services/records'},

    ]

    return (
        <li>
            {list.map(({text, href}, index) => {
                return (
                    <a href={href}>{text}</a>
                )
            })}
        </li>
    )
}

export default Services;