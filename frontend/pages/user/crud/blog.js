
import Layout from '../../../hoc/Layout';

import BlogCreate from '../../../components/crud/BlogCreate';
import Private from "../../../components/auth/Private";

const Blog = () => {
    return (
        <Layout>
            <Private>
                    <div className="row ">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new blog</h2>
                        </div>
                        <div className="col-md-12">
                             <BlogCreate />
                        </div>
                    </div>

            </Private>
        </Layout>
    );
};

export default Blog;