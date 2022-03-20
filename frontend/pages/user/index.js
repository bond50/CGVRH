import React from "react";

import Private from "../../components/auth/Private";
import Home from "../../components/user/home";
import Layout from "../../hoc/admin/layout/layout";


const AdminIndex = () => {
    return (
        <Layout>
            <Private>
                <Home/>
            </Private>
        </Layout>
    );
};

export default AdminIndex;
