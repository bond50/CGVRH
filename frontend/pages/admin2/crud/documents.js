import React from 'react';
import dynamic from "next/dynamic";
import Preloader from "../../../components/preloader";


const Layout = dynamic(() => import('../../../hoc/Layout'), { ssr: false, loading: () => <Preloader /> });
const Admin = dynamic(() => import('../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const BlogRead = dynamic(() => import('../../../components/crud/BlogRead'), { ssr: false, loading: () => <Preloader /> });



const Blogs = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage blogs</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogRead/>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blogs;