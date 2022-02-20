import BlogCreate from '../../../components/crud/BlogCreate';
import Private from "../../../components/auth/Private";
import Layout from "../../../hoc/admin/layout/layout";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <BlogCreate/>
            </Private>
        </Layout>
    );
};

export default Blog;