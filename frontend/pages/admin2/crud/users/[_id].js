import Layout from "../../../../hoc/admin/layout/layout";
import Admin from "../../../../components/auth/Admin";
import React from "react";
import UserUpdateComponent from "../../../../components/auth/user-update-component";
import {useRouter} from "next/router";

const Slug = () => {
const router = useRouter()

    return (
        <Layout>
            <Admin>
                <UserUpdateComponent id={router.query._id}/>
            </Admin>
        </Layout>
    );
};

export default Slug;