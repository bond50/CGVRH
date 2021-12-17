import Layout from "../hoc/Layout";
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
        <Layout>
            <div className='container mt-5 mb-0'>
                    <div className="col-lg-8">
                        {router.query.message && <Alert msg={router.query.message} type='danger' label='Danger'/>}
                    </div>
                </div>

            <SigninComponent/>
        </Layout>
    );
};

export default withRouter(Signin);