import Link from "next/link";

const SignIn = ({className}) => {
    return <li>
        <Link href={`/signin/`}>
            <a className={className}>Signin</a>
        </Link>
    </li>;
};

export default SignIn;