import React from 'react';
import Layout from "../../../hoc/Layout";
import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Slug = () => {
    return (
           <Layout>
            <Admin>
                    <div className="row ">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update blog</h2>
                        </div>
                        <div className="col-md-12">
                             <BlogUpdate />
                        </div>
                    </div>

            </Admin>
        </Layout>
    );
};

export default Slug;