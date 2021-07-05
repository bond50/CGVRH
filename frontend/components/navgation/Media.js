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
       <ul>
            {list.map(({text, href}, index) => {
                return (
                    <li key={index}><a href={href}>{text}</a></li>
                )
            })}
        </ul>
    )
}

export default Media;