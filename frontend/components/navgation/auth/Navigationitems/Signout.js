import {signout} from "../../../../actions/auth";
import Router from "next/router";

const SignOut = ({className}) =>
    <li
        onClick={() => signout(() => Router.replace(`/signin`))}>
        <div className={className}>Signout</div>
    </li>

export default SignOut;