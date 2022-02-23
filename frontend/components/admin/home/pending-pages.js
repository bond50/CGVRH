import CardDetail from "./card-detail";
import DynamicTableRows from "./dynamic-table-rows";
import Alert from "../../messages/Alert";
import useARP from "../../../hooks/useARP";
import {Fragment} from "react";
import {isAuth} from "../../../actions/auth";

const PendingPages = ({username}) => {
    const {
        mouseMoveHandler,
        loading,
        deleteConfirm,
        error,
        removed,
        data: blogs,
        message
    } = useARP(username ? `/${username}/pending-pages` : '/pending-pages')

    function showBlogs() {
        if (loading) {
            return <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        if (error) {
            return <Alert msg={error} label='Danger' type='danger'/>
        }

        return blogs.length > 0 &&
            <CardDetail title='Pending Pages' spanText={'Are not seen anywhere else apart from here'}>
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

    // if (blogs.length <= 0) {
    //     return <div className='text-muted'>
    //         No pages added to your Website yet. Please start adding pages by clicking <Link
    //         href={'/user/crud/gen-page/'}> here
    //     </Link>
    //     </div>
    // }

    return (
        <div onMouseMove={mouseMoveHandler}>
            {removed && <Alert msg={message} label='Success' type='success' reload/>}
            {showBlogs()}
        </div>
    );
};


export default PendingPages;