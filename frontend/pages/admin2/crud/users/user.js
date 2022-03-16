import React from 'react';
import Admin from "../../../../components/auth/Admin";
import Layout from "../../../../hoc/admin/layout/layout";
// import SuperSignupForm from "../../../../components/auth/super-signup-form";


const User = () => {
    return (
        <Admin>
            <Layout>
                <p>hello</p>
                {/*<SuperSignupForm/>*/}
            </Layout>
        </Admin>
    );
};

export default User;