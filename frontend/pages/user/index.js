import React from "react";
import Private from "../../components/auth/Private";
import Home from "../../components/user/home";
import Layout from "../../hoc/admin/layout/layout";


const AdminIndex = () => {
    return (
        <Layout>
            <Private>
                <Home/>
                {/*<div className='row'>*/}
                {/*    <div className="col-md-4">*/}
                {/*        <ul className="list-group">*/}
                {/*            <li className="list-group-item">*/}
                {/*                <a href={`/user/crud/blog`}>Create Blog</a>*/}
                {/*            </li>*/}
                {/*            <li className="list-group-item">*/}
                {/*                <Link href="/user/crud/blogs">*/}
                {/*                    <a>Update/Delete Blog</a>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*            <li className="list-group-item">*/}
                {/*                <Link href={`/user/update`}>*/}
                {/*                    <a>Update Profile</a>*/}
                {/*                </Link>*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Private>
        </Layout>
    );
};

export default AdminIndex;
