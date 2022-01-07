import React from 'react';

import Admin from '../../../../components/auth/Admin';
import ServiceCreate from '../../../../components/crud/ServiceCreate';
import Layout from "../../../../hoc/admin/layout/layout";


const Service = () => {
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-2 pb-2">
                        <h2>Create a new service</h2>
                    </div>
                    <div className="col-md-12">
                        <ServiceCreate/>
                    </div>
                </div>

            </Admin>
        </Layout>
    );
};

export default Service;