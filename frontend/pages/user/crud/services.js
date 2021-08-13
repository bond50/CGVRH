import React from 'react';
import Layout from '../../../hoc/Layout';

import Private from "../../../components/auth/Private";
import {isAuth} from "../../../actions/auth";
import ServiceRead from "../../../components/crud/ServiceRead";

const Blogs = () => {

    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <ServiceRead username={isAuth() && isAuth().username}/>
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blogs;