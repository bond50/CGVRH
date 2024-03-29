import PendingPosts from "./pending-posts";
import ApprovedPosts from "./approved-posts";
import PendingPages from "./pending-pages";
import ApprovedPages from "./approved-pages";


const HomePage = () => {
    return (
        <div className='row'>
            <div className='col-md-12'>
                <PendingPages/>
                <PendingPosts/>
                <ApprovedPages/>
                <ApprovedPosts/>

                {/*<RejectedPosts data={data}/>*/}
            </div>


        </div>
    );
};

export default HomePage;