import React, {useEffect} from "react";
import Router from "next/router";
import {isAuth} from "../../actions/auth";
import AboutContainer from "../reusables/AboutContainer";

const Admin = ({children}) => {
    useEffect(() => {
        let componentMounted = true;
        if (!isAuth()) {
            Router.push(`/admin-login`);
        } else if (isAuth().role !== 1) {
            Router.push(`/user`);
        }

        return () => {
            componentMounted = false;
        }
    }, []);
    return <> {children} </>;
};

export default Admin;