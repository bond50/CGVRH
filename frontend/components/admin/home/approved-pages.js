import CardDetail from "./card-detail";
import DynamicTableRows from "./dynamic-table-rows";
import Alert from "../../messages/Alert";
import useARP from "../../../hooks/useARP";
import {Fragment} from "react";
import {isAuth} from "../../../actions/auth";


const ApprovedPages = ({username}) => {
    const {
        mouseMoveHandler,
        loading,
        deleteConfirm,
        error,
        removed,
        data: blogs,
        message
    } = useARP(username ? `/${username}/general` : '/services')


    function showBlogs() {
        if (loading) {
            return <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        if (error) {
            return <Alert msg={error} label='Danger' type='danger'/>
        }

        return blogs.length > 0 && <CardDetail title='Approved Pages' spanText={'active pages'}>
            {blogs.map(blog => {
                let endpoint
                if (isAuth() && isAuth().role === 1) {
                    endpoint = `/admin2/crud/gen-page/${blog.slug}`

                } else if (isAuth() && isAuth().role === 0) {
                    endpoint = `/user/crud/gen-page/${blog.slug}`
                }

                return <Fragment key={blog._id}>
                    <DynamicTableRows blog={blog} deleteConfirm={deleteConfirm} endpoint={endpoint}/>
                </Fragment>
            })}
        </CardDetail>

    }

    return (
        <div onMouseMove={mouseMoveHandler}>
            {removed && <Alert msg={message} label='Success' type='success' reload/>}
            {showBlogs()}
        </div>
    );
};

export default ApprovedPages;