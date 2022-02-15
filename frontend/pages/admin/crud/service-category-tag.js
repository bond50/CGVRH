import Layout from "../../../hoc/Layout";
import Admin from "../../../components/auth/Admin";
import ServiceCategory from "../../../components/crud/service-category";
import ServiceTag from "../../../components/crud/service-tag";

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div className="col-md-6">
                            <ServiceCategory/>
                        </div>
                        <div className="col-md-6">
                            <ServiceTag/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;
