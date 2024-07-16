import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import Head from "next/head";
import { APP_NAME } from "../config";
import Preloader from "../components/preloader";

const SigninComponent = dynamic(() => import("../components/auth/SignInComponent"), { ssr: false, loading: () => <Preloader /> });
const Alert = dynamic(() => import("../components/messages/Alert"), { ssr: false, loading: () => <Preloader /> });

const Signin = ({ router }) => {
    const head = () => (
        <Head>
            <title>Signin | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    return (
        <>
            {head()}
            <div className="col-lg-12">
                {router.query.message && <Alert msg={router.query.message} type='danger' label='Danger' />}
            </div>
            <SigninComponent />
        </>
    );
};

export default withRouter(Signin);
