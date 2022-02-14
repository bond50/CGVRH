import Link from "next/link";

const SignUp = ({className}) => <li>
    <Link href={`/signup/`}>
        <a className={className}>Signup</a>
    </Link>
</li>;

export default SignUp;