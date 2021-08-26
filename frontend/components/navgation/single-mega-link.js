import Link from "next/link";


const SingleMegaLink = ({href, title,clicked}) => {

    return (
            <li>
                <i className="bi bi-arrow-right-circle mx-2"/>
                <Link href={href}>
                    <a className='nav-item' onClick={clicked} >{title}</a>
                </Link>
            </li>
    );
};

export default SingleMegaLink;