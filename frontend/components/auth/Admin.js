import React, {useEffect} from "react";
import Router from "next/router";
import {isAuth} from "../../actions/auth";
import AboutContainer from "../reusables/AboutContainer";

const Admin = ({children}) => {
    useEffect(() => {
        let componentMounted = true;
        if (!isAuth()) {
            Router.push(`/signin`);
        } else if (isAuth().role !== 1) {
            Router.push(`/admin`);
        }

        return () => {
            componentMounted = false;
        }
    }, []);
    return <div className="container p-5 pb-5"> {children} < /div>;
};

export default Admin;