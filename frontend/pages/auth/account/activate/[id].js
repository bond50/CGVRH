import { useEffect, useState } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { signup } from '../../../../actions/auth';
import Link from "next/link";
import Head from 'next/head';
import Preloader from '../../../../components/preloader';
import {APP_NAME} from "../../../../config";

const jwt = dynamic(() => import('jsonwebtoken'), { ssr: false, loading: () => <Preloader /> });

const ActivateAccount = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });
    const { name, token, error, loading, success, showButton } = values;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setValues(prevValues => ({ ...prevValues, name, token }));
        }
    }, [router]);

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues(prevValues => ({ ...prevValues, loading: true, error: '' }));
        signup({ token }).then(data => {
            if (data.error) {
                setValues(prevValues => ({
                    ...prevValues,
                    loading: false,
                    error: data.error,
                    showButton: false
                }));
            } else {
                setValues(prevValues => ({
                    ...prevValues,
                    loading: false,
                    success: true,
                    showButton: false
                }));
            }
        });
    };

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Activate Account | {APP_NAME}</title>
            </Head>
            <div className="container mt-5">
                <h3>Hey {name}, ready to activate your account?</h3>
                {loading && <h2>Loading...</h2>}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                    <div className="alert alert-success">
                        You have successfully activated your account. Please sign in.
                    </div>
                )}
                {showButton && (
                    <button className="btn btn-primary mt-4" onClick={clickSubmit}>
                        Activate account
                    </button>
                )}
                {!success && (
                    <Link href={`/signup`}>
                        <a className="btn btn-outline-secondary mx-2 mt-4">Back to sign up</a>
                    </Link>
                )}
                {success && (
                    <Link href={`/signin`}>
                        <a className="btn btn-outline-success btn-sm mx-2">Sign in here</a>
                    </Link>
                )}
            </div>
        </>
    );
};

export default withRouter(ActivateAccount);
