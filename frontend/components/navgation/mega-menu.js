import SingleLink from "./singe_link/single-link";

const MegaMenu = ({children, deepText, activeClassName, megaToggle, megaOpen}) => {


    return (
        <SingleLink
            deepText={deepText}
            mega
            className={activeClassName}
            clicked={megaToggle}>
            <div className={`mega-menu ${megaOpen ? 'mega-active' : 'mega-menu-inactive'}`}>
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