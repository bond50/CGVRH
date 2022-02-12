import Admin from "../../../../components/auth/Admin";
import PageCategory from "../../../../components/crud/page-category";
import Layout from "../../../../hoc/admin/layout/layout";

const CategoryTag = () => {
    return (
        <Layout pageTitle='Manage categories and Tags'>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <PageCategory/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;
