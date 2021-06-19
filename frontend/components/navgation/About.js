import NavigationItem from "./Navigationitems/NavigationItem/NavigationItem";

const About = () => {
    const list = [

        {text: 'Our Mission', href: '/about/mission/'},
        {text: 'Our Vision ', href: '/about/vision/'},
        {text: 'Our Core values', href: '/about/core-values/'},
        {text: 'Our Board Members', href: '/about/board-members/'},
        {text: 'Our Organogram', href: '/about/organisation-structure/'},
        {text: 'Our Role', href: '/about/roles/'},
        {text: 'Our Strategic Plan', href: '/about/strategic-plan/'},
        {text: 'Our Health Goals', href: '/about/health-goals/'},
        {text: 'Our Neighboring Facilities', href: '/about/neighboring-facilities/'},
        {text: 'Our Projects', href: '/about/project/'},
        {text: 'Our Partners', href: '/about/partners/'},
    ]

    return (
        <>
            {list.map(({text, href}, index) => {
                return (
                    <NavigationItem key={index} href={href} text={text}/>
                )
            })}
        </>
    )
}

export default About;