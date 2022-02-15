import PageUpdate from "../../../../components/crud/PageUpdate";
import Layout from "../../../../hoc/admin/layout/layout";
import Private from "../../../../components/auth/Private";


const Slug = () => {

    return (
        <Layout>
            <Private>
                <PageUpdate/>
            </Private>
        </Layout>
    );
};

export default Slug;