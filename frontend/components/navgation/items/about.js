import MyLink from "../myLink";
import SingleDropdown from "../single-dropdown";

const About = () => {
    const list = [
        {_id: 'as', title: 'Our Guiding principles', slug: 'guiding-principles'},
        {_id: 'asd', title: 'Our Management Team', slug: 'board-members'},
        {_id: 'asdf', title: 'Our Management Structure', slug: 'organisation-structure'},
        {_id: 'asdfg', title: 'Our Role', slug: 'roles'},
        {_id: 'qwer', title: 'Our About Plan', slug: 'strategic-plan'},
        {_id: 'jhiu', title: 'Our Health Goals', slug: 'health-goals'},
        {_id: 'gcgcgcgc', title: 'Our Neighboring Facilities', slug: 'neighboring-facilities'},
        {_id: 'gdgdgdgdg', title: 'Our Projects', slug: 'project'},
        {_id: 'ffufu', title: 'Our Partners', slug: 'partners'},
    ]

    const showLinks = list.map(li => <MyLink
        key={li._id}
        to={li.slug} caption={li.title} dropdown/>)
    return (
        <SingleDropdown to={''} caption={'About'}>
            {showLinks}
        </SingleDropdown>
    );
};

export default About;