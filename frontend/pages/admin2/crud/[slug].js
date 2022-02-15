import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Layout from "../../../hoc/admin/layout/layout";


const Slug = () => {


    return (
        <Layout>
            <Admin>
                <BlogUpdate/>
            </Admin>
        </Layout>
    );
};

export default Slug;