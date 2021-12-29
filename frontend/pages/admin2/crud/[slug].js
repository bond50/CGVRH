import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";
import Layout from "../../../hoc/admin/layout/layout";
import React from "react";


const Slug = () => {
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-xxl-4 col-xl-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Update <span>| This Year</span></h5>
                                <div className="row mb-3">
                                    <label className="col-sm-2 col-form-label">Approve</label>
                                    <div className="col-sm-10">
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">yes</option>
                                            <option value="2">No</option>
                                        </select>
                                    </div>
                                </div>
                                {/*<div className="row mb-3">*/}
                                {/*    <label className="col-sm-2 col-form-label">Reject</label>*/}
                                {/*    <div className="col-sm-10">*/}
                                {/*        <select className="form-select" aria-label="Default select example">*/}
                                {/*            <option value="1">yes</option>*/}
                                {/*            <option value="2">No</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <BlogUpdate/>
                    </div>
                </div>

            </Admin>
        </Layout>
    );
};

export default Slug;