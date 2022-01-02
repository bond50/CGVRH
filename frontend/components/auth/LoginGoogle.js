import GoogleLogin from 'react-google-login';
import {GOOGLE_CLIENT_ID} from "../../config";
import {authenticate, isAuth, loginWithGoogle} from "../../actions/auth";
import Router from "next/router";

const LoginGoogle = () => {
     const responseGoogle = response => {

        const tokenId = response.tokenId;


        const user = { tokenId };

        loginWithGoogle(user).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin2`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    };

    return (
        <div className='pb-3'>
            <GoogleLogin

                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
            />
        </div>
    );
};

export default LoginGoogle;