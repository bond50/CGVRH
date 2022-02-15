import Admin from "../../../components/auth/Admin";
import BlogCategory from "../../../components/crud/blog-category";
import BlogTag from "../../../components/crud/blog-tag";
import Layout from "../../../hoc/admin/layout/layout";

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
                            <BlogCategory/>
                        </div>
                        <div className="col-md-6">
                            <BlogTag/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default CategoryTag;
