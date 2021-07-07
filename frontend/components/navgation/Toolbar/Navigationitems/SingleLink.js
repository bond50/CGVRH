import Link from "next/link";

const SingleLink = ({href, text, customClassName}) => (
        <li key={1}>
            <Link href={href}>
                <a className={`nav-link ${customClassName}`}>{text}</a>
            </Link>
        </li>
    );

export default SingleLink;