import Layout from '../../../hoc/Layout';


import Private from "../../../components/auth/Private";
import PageCreate from "../../../components/crud/PageCreate";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="row ">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>Create a new blog</h2>
                    </div>
                    <div className="col-md-12">
                        <PageCreate/>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;