import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import AboutContainer from "../reusables/AboutContainer";

const Private = ({ children }) => {
    useEffect(() => {
        if (!isAuth()) {
            Router.push(`/signin`);
        }
    }, []);
    return <AboutContainer>{children}</AboutContainer>;
};

export default Private;