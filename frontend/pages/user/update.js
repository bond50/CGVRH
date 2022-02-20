import React from "react";
import Layout from "../../hoc/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";


const UserUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className='row'>
                    <ProfileUpdate/>
                </div>
            </Private>
        </Layout>
    );
};

export default UserUpdate;