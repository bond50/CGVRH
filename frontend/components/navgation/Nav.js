import SingleLink from "./single-link"
import {aboutList, mediaList, servicesList,} from "./dropdown-links";
import {useRouter} from "next/router";
import SingleDropdown from "./single-dropdown";
import SingleMegaLink from "./single-mega-link";
import {useEffect, useState} from "react";
import MegaMenu from "./mega-menu";
import {chunkArray} from "../reusables/functions/array-chunk";
import useSWR from "swr";
import {API} from "../../config";

const Nav = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false)

    const [megaOpen, setMegaOpen] = useState(false)

    const megaToggle = () => {
        setMegaOpen(megaOpen => !megaOpen)
    };

    const {data: services, error: serviceError} = useSWR(`${API}/list-service-names-slugs`)
    if (serviceError) {
        return <p className='uh-oh'>Failed to fetch medical services.</p>
    }
    if (!services) {
        return <div className='preloader'/>
    }





    const lists = [
        {to: '/', caption: 'Home'},
        {caption: 'About', component: aboutList, to: "about"},
        {caption: 'Services', component: servicesList, to: 'services'},
        {caption: 'Medical services', component: services, to: 'services'},
        {caption: 'Media', component: mediaList, to: 'media'},
        {to: '/blogs/', caption: 'Blog',},
        {to: '/contact/', caption: 'Contact',},
    ]


    const MobileToggle = () => {
        setOpen(open => !open)
    };

    const closeMobile = () => {
        setOpen(false)
    };


    let attachedClasses = ['navbar order-last order-lg-0'];

    if (open) {
        attachedClasses = ['navbar-mobile', 'nav-open'];
    }


    const renderNavigationItems = () => {
        return lists.map((list, index) => {
                if (list.component) {
                    if (list.component.length >= 32) {
                        const chunkedArray = chunkArray(list.component, 3)
                        const first = chunkedArray[0].map(el => <SingleMegaLink
                                key={el._id}
                                clicked={closeMobile}
                                href={`/${list.to}/${el.slug}`}
                                title={el.title}
                            />
                        )
                        const second = chunkedArray[1].map(el => <SingleMegaLink
                                key={el._id}
                                clicked={closeMobile}
                                href={`/${list.to}/${el.slug}`}
                                title={el.title}
                            />
                        )
                        const third = chunkedArray[2].map(el => <SingleMegaLink
                            key={el._id}
                            clicked={closeMobile}
                            href={`/${list.to}/${el.slug}`}
                            title={el.title}
                        />)

                        return <MegaMenu deepText={list.caption} key={index} megaOpen={megaOpen} megaToggle={megaToggle}>
                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {third}
                                </ul>
                            </div>

                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {second}
                                </ul>
                            </div>
                            <div className={`col-lg-4 mega-links `}>
                                <ul>
                                    {first}
                                </ul>
                            </div>
                        </MegaMenu>

                    }
                    return <SingleDropdown
                        deepText={list.caption}
                        key={index}>
                        {list.component.map((lis, i) => {
                                return <SingleLink
                                    key={lis._id}
                                    text={lis.title}
                                    href={`/${list.to}/${lis.slug}`}
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