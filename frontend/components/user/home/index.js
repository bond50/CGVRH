import PendingPosts from "../../admin/home/pending-posts";
import ApprovedPosts from "../../admin/home/approved-posts";
import PendingPages from "../../admin/home/pending-pages";
import ApprovedPages from "../../admin/home/approved-pages";
import {isAuth} from "../../../actions/auth";


const HomePage = () => {
    isAuth()&&isAuth().user
    return (
        <div className='row'>
            <div className='col-md-12'>
                <PendingPages username={isAuth() && isAuth().username}/>
                <PendingPosts username={isAuth() && isAuth().username}/>
                <ApprovedPages username={isAuth() && isAuth().username}/>
                <ApprovedPosts  username={isAuth() && isAuth().username}/>

                {/*<RejectedPosts data={data}/>*/}
            </div>


        </div>
    );
};

export default HomePage;