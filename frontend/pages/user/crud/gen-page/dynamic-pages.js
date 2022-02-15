import PageRead from '../../../../components/crud/PageRead';
import Layout from "../../../../hoc/admin/layout/layout";
import Private from "../../../../components/auth/Private";
import {isAuth} from "../../../../actions/auth";


const Blogs = () => {
    return (
        <Layout pageTitle='Manage Dynamic pages'>
            <Private>
                <PageRead username={isAuth() && isAuth().username}/>
            </Private>
        </Layout>
    );
};

export default Blogs;