import Layout from "../../../hoc/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/document-category";
import Tag from "../../../components/crud/document-tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Documents Categories and Tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag/>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
