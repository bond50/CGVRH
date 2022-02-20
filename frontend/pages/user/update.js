import React from "react";

import Private from "../../components/auth/Private";
import UserUpdateComponent from "../../components/auth/user-update-component";
import Layout from "../../hoc/admin/layout/layout";


const UserUpdate = () => {

    return (
        <Layout>
            <Private>
                <div className='row'>
                    <UserUpdateComponent/>
                </div>
            </Private>
        </Layout>
    );
};

export default UserUpdate;