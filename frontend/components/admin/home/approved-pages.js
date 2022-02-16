import CardDetail from "./card-detail";
import DynamicTableRows from "./dynamic-table-rows";
import MyModal from "../../reusables/ui/modal";
import Alert from "../../messages/Alert";
import useARP from "../../../hooks/useARP";
import {isAuth} from "../../../actions/auth";


const ApprovedPages = ({username}) => {
    const {
        mouseMoveHandler,
        deletePage,
        handleShow,
        handleClose,
        show,
        loading,
        error,
        removed,
        blogs,
        message
    } = useARP(username ? `/${username}/general` : '/general')


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

                return <DynamicTableRows
                    key={blog._id}
                    blog={blog}
                    to={endpoint}
                    showModal={handleShow}/>
            })}
        </CardDetail>

    }

    return (
        <div onMouseMove={mouseMoveHandler}>
            {removed && <Alert msg={message} label='Success' type='success' reload/>}
            {showBlogs()}
            {show && blogs.map((b, i) => {
                return <MyModal
                    key={i}
                    show={show} titleMessage='Delete confirm'
                    bodyMessage={`Are you sure you want to delete blog entitled ${b.title}`}
                    handleChanges={() => deletePage(b.slug)}
                    handleClose={handleClose}/>
            })}
        </div>
    );
};

export default ApprovedPages;