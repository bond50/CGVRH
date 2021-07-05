const Covid = () => {
    const list = [
        {text: 'FAqs', href: '/covid/covid'},
        {text: 'Proper Hand Care', href: '/covid/hand'},
        {text: 'How prepared is VCRH', href: '/covid/prep'},
    ]

    return (
        <>
            {list.map(({text, href}, index) => {
                return (
                    <li key={index}><a href={href}>{text}</a></li>
                )
            })}
        </>
    )
}

export default Covid;