import Admin from '../../../../components/auth/Admin';
import PageRead from '../../../../components/crud/PageRead';
import Layout from "../../../../hoc/admin/layout/layout";


const Blogs = () => {
    return (
        <Layout pageTitle='Manage Dynamic pages'>
            <Admin>
                <PageRead/>
            </Admin>
        </Layout>
    );
};

export default Blogs;