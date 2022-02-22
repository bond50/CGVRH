import SigninComponent from "../components/auth/SignInComponent";
import {withRouter} from "next/router";
import Alert from "../components/messages/Alert";


const Signin = ({router}) => {
    // const showRedirectMessage = () => {
    //
    //     if (router.query.message) {
    //         return <div className="alert alert-danger">{router.query.message}</div>;
    //     } else {
    //         return;
    //     }
    // };
    return (
        <>
            <div className="col-lg-12">
                {router.query.message && <Alert msg={router.query.message} type='danger' label='Danger'/>}
            </div>
            <SigninComponent/>
        </>
    );
};

export default withRouter(Signin);