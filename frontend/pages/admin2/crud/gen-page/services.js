import React from 'react';
import Admin from '../../../../components/auth/Admin';
import ServiceRead from "../../../../components/crud/ServiceRead";
import Layout from "../../../../hoc/admin/layout/layout";


const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new service</h2>
                        </div>
                        <div className="col-md-12">
                              <ServiceRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;