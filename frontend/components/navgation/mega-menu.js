import {useState} from 'react';
import SingleLink from "./single-link";

const MegaMenu = ({children, deepText, activeClassName}) => {
    const [megaOpen, setMegaOpen] = useState(false)

    const megaToggle = () => {
        setMegaOpen(megaOpen => !megaOpen)
    };


    return (
        <SingleLink
            deepText={deepText}
            mega
            className={activeClassName}
            clicked={megaToggle}>
            <div className={`mega-menu ${megaOpen ? 'mega-active' : ''}`}>
                <div className="container">
                    <div className="row">
                        {children}
                    </div>
                </div>
            </div>
        </SingleLink>
    );
};

export default MegaMenu;