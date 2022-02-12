import React from 'react';
import Layout from '../../../hoc/Layout';
import Admin from '../../../components/auth/Admin';
import PageCreate from '../../../components/crud/PageCreate';


const Service = () => {
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-2 pb-2">
                        <h2>Create a new service</h2>
                    </div>
                    <div className="col-md-12">
                        <PageCreate/>
                    </div>
                </div>

            </Admin>
        </Layout>
    );
};

export default Service;