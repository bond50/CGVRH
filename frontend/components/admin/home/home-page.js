import PendingPosts from "./pending-posts";
import ApprovedPosts from "./approved-posts";
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../reusables/functions/fetcher";
import {getCookie} from "../../../actions/auth";


const HomePage = () => {

    const token = getCookie('token');
    const {data: pendingBlogs, error} = useSWR([
            `${API}/pending-blogs`,
            null,
            token
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },)


    const {data: approvedBlogs, error: approvedBlogError} = useSWR([
            `${API}/blogs`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        })
    if (error || approvedBlogError) return <p>Loading failed...</p>;
    if (!pendingBlogs && approvedBlogs) return <div className='preloader'/>


    return (
        <div className='row'>
            <div className='col-md-12'>
                {!pendingBlogs|| pendingBlogs.length <= 0 ? null :<PendingPosts data={pendingBlogs}/>}
                {!approvedBlogs|| approvedBlogs.length <= 0 ? null :<ApprovedPosts data={approvedBlogs}/>}
                {/*<RejectedPosts data={data}/>*/}
            </div>
        </div>
    );
};

export default HomePage;