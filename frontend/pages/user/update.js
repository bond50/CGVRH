import React from "react";
import Layout from "../../hoc/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";
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
