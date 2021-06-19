import NavigationItem from "./Navigationitems/NavigationItem/NavigationItem";

const Media = () => {
    const list = [
        {text: 'Downloads', href: '/media/downloads'},
        {text: 'Events', href: '/media/events'},
        {text: 'Gallery', href: '/media/gallery'},
        {text: 'Press', href: '/media/press'},
        {text: 'Publications', href: '/media/publications'},
        {text: 'Vacancies', href: '/media/vacancies'},


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

export default Media;