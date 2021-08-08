import {signout} from "../../../../actions/auth";
import Router from "next/router";

const SignOut = ({className}) =>
    <li
        onClick={() => signout(() => Router.replace(`/signin`))}>
        <a className={className}>Signout</a>
    </li>

export default SignOut;