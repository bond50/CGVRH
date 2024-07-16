import dynamic from "next/dynamic";
import Head from "next/head";
import { APP_NAME } from "../config";
import Preloader from "../components/preloader";

const SignupComponent = dynamic(() => import("../components/auth/SignUpComponent"), { ssr: false, loading: () => <Preloader /> });

const Signup = () => {
    const head = () => (
        <Head>
            <title>Signup | {APP_NAME}</title>
            <meta name="robots" content="noindex, nofollow" />
        </Head>
    );

    return (
        <>
            {head()}
            <SignupComponent />
        </>
    );
};

export default Signup;
