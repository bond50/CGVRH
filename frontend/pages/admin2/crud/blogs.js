import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Layout from "../../../hoc/admin/layout/layout";


const Blogs = () => {
    return (
        <Layout pageTitle='Manage Blogs'>
            <Admin>
                <BlogRead/>
            </Admin>
        </Layout>
    );
};

export default Blogs;