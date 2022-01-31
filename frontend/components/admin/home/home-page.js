import PendingPosts from "./pending-posts";
import ApprovedPosts from "./approved-posts";


const HomePage = () => {
    return (
        <div className='row'>
            <div className='col-md-12'>
                <PendingPosts/>
                <ApprovedPosts/>
                {/*<RejectedPosts data={data}/>*/}
            </div>


        </div>
    );
};

export default HomePage;