import CardDetail from "./card-detail";
import DynamicTableRows from "./dynamic-table-rows";
import Alert from "../../messages/Alert";
import useARP from "../../../hooks/useARP";
import {isAuth} from "../../../actions/auth";

const ApprovedPosts = ({username}) => {
    const {
        mouseMoveHandler,
        loading,
        deleteBlogConfirm,
        error,
        removed,
        data: blogs,
        message
    } = useARP(username ? `/${username}/blogs` : '/blogs')

    function showBlogs() {
        if (loading) {
            return <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        if (error) {
            return <Alert msg={error} label='Danger' type='danger'/>
        }

        return blogs.length > 0 && <CardDetail title='Approved Blogs' spanText={'Active articles'}>
            {blogs.map(blog => {
                let endpoint
                if (isAuth() && isAuth().role === 1) {
                    endpoint = `/admin2/crud/${blog.slug}`

                } else if (isAuth() && isAuth().role === 0) {
                    endpoint = `/user/crud/${blog.slug}`
                }

                return <DynamicTableRows blog={blog} deleteConfirm={deleteBlogConfirm} endpoint={endpoint}
                                         key={blog._id}/>
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

export default ApprovedPosts;