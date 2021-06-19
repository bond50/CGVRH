import NavigationItem from "./Navigationitems/NavigationItem/NavigationItem";

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
                    <NavigationItem key={index} href={href} text={text}/>
                )
            })}
        </>
    )
}

export default Covid;