import Admin from "../../../components/auth/Admin";
import BlogCategory from "../../../components/crud/blog-category";
import BlogTag from "../../../components/crud/blog-tag";
import Layout from "../../../hoc/admin/layout/layout";

const CategoryTag = () => {
    return (
        <Layout pageTitle='Manage categories and Tags'>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
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
