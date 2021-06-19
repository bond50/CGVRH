import Link from "next/link";
const NavigationItem = ({href, text}) =>
    <li>
        <Link href={href}>
            <a>{text}</a>
        </Link>
    </li>

export default NavigationItem;