import CardDetail from "./card-detail";
import DynamicTableRows from "./dynamic-table-rows";
import MyModal from "../../reusables/ui/modal";
import Alert from "../../messages/Alert";
import useARP from "../../../hooks/useARP";

const PendingPosts = () => {
    const {
        mouseMoveHandler,
        deleteBlog,
        handleShow,
        handleClose,
        show,
        loading,
        error,
        removed,
        blogs,
        message
    } = useARP('/pending-blogs')

    function showBlogs() {
        if (loading) {
            return <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        if (error) {
            return <Alert msg={error} label='Danger' type='danger'/>
        }

        return blogs.length > 0 && <CardDetail title='Pending Blogs' spanText={'Needs to be approved'}>
            {blogs.map(blog => {
                return <DynamicTableRows
                    key={blog._id}
                    blog={blog}
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
                    handleChanges={() => deleteBlog(b.slug)}
                    handleClose={handleClose}/>
            })}
        </div>
    );
};

export default PendingPosts;