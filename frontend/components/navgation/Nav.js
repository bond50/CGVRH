import SingleLink from "./single-link"
import {aboutList, mediaList, servicesList, megaList} from "./dropdown-links";
import {useRouter} from "next/router";
import SingleDropdown from "./single-dropdown";
import SingleMegaLink from "./single-mega-link";
import {useState} from "react";
import Link from "next/link";
import MegaMenu from "./mega-menu";
import {chunkArray} from "../reusables/functions/array-chunk";

const Nav = ({services}) => {


    const [open, setOpen] = useState(false)
    const router = useRouter();


    const lists = [
        {to: '/', caption: 'Home'},
        {caption: 'About', component: aboutList, ssr: false},
        {caption: 'Services', component: servicesList, ssr: false},
        // {caption: 'Patient care', component: services, ssr: true},
        {caption: 'Media', component: mediaList, ssr: false},
        {to: '/blogs/', caption: 'Blog',},
        {to: '/contact/', caption: 'Contact'},
    ]


    const MobileToggle = () => {
        setOpen(open => !open)
    };

    let attachedClasses = [];

    if (open) {
        attachedClasses = ['navbar-mobile', 'nav-open'];
    }


    const renderNavigationItems = () => {
        return lists.map((list, index) => {
                if (list.component) {
                    if (list.component.length >= 15) {

                        const chunkedArray = chunkArray(list.component, 3)
                        const first = chunkedArray[0].map((el, i) => <SingleMegaLink
                                key={i}
                                href={list.ssr ? `/services/${el.slug}` : `${el.slug}`}
                                title={el.title}
                            />
                        )
                        const second = chunkedArray[1].map((el, i) => <SingleMegaLink
                                key={i}
                                href={list.ssr ? `/services/${el.slug}` : `${el.slug}`}
                                title={el.title}
                            />
                        )
                        const third = chunkedArray[2].map((el, i) => <SingleMegaLink
                                key={i}

                                title={el.title}
                            />
                        )

                        return <MegaMenu deepText={list.caption} key={index}>
                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {first}
                                </ul>
                            </div>

                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {second}
                                </ul>
                            </div>
                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {third}
                                </ul>
                            </div>
                        </MegaMenu>

                    }
                    return <SingleDropdown
                        deepText={list.caption}
                        key={index}>
                        {list.component.map((lis, i) => {
                                return <SingleLink
                                    key={i}
                                    text={lis.title}
                                    href={list.ssr ? `/services/${lis.slug}` : `${lis.slug}`}
                                    className={router.asPath === lis.href ? 'active' : null}/>;
                            }
                        )}
                    </SingleDropdown>

                } else {
                    return <SingleLink
                        key={index}
                        text={list.caption}
                        href={list.to}
                        className={router.asPath === list.to ? `nav-link active` : null}/>
                }
            }
        )
    }


    return (
        <nav className={`${attachedClasses.join(' ')}`}>
            <ul className='menu-items'>
                {renderNavigationItems()}
            </ul>
            <i className={`${open ? 'bi bi-x' : 'bi bi-list'} mobile-nav-toggle`} onClick={MobileToggle}/>
        </nav>
    );
};

export default Nav;