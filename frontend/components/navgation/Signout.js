import {signout} from "../../actions/auth";
import Router from "next/router";

const SignOut = () => {
    return (
            <li
                className='nav-link'
                onClick={() => signout(() => Router.replace(`/signin`))}>
                <a>Signout</a>
            </li>

    )
}

export default SignOut;