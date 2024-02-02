// import React from 'react';
//
//
// const MobileNavToggle = ({clicked,isOpen}) => {
//     return (
//         <i className={`${isOpen ? 'bi bi-x text-white' : 'bi bi-list '} mobile-nav-toggle`}
//                onClick={clicked}/>
//     );
// };
//
// export default MobileNavToggle;

import React from 'react';

const MobileNavToggle = ({clicked, isOpen}) => {
    return (
        <i className={`bi bi-${isOpen ? "x" : "list"} mobile-nav-toggle d-none`} onClick={clicked}></i>
    );
};

export default MobileNavToggle;