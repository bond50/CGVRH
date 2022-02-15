import React, {useEffect} from "react";
import Router from "next/router";
import {isAuth} from "../../actions/auth";

const Admin = ({children}) => {
    useEffect(() => {

        if (!isAuth()) {
            Router.push(`/admin-login`);
        } else if (isAuth().role !== 1) {
            Router.push(`/user`);
        }

    }, []);
    return <> {children} </>;
};

export default Admin;