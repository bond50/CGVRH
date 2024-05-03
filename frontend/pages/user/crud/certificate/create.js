import CertCreate from '../../../../components/crud/certificate/CertCreate';
import Private from "../../../../components/auth/Private";
import Layout from "../../../../hoc/admin/layout/layout";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <CertCreate/>
            </Private>
        </Layout>
    );
};

export default Blog;