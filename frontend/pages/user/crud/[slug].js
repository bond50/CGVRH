import React from 'react';
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Private from "../../../components/auth/Private";
import Layout from "../../../hoc/admin/layout/layout";

const Slug = () => {
    return (
        <Layout>
            <Private>
                <div className="row ">
                    <div className="col-md-12 pt-5 pb-5">
                        <h2>Update blog</h2>
                    </div>
                    <div className="col-md-12">
                        <BlogUpdate/>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Slug;