
import SideBar from "../components/blog/SideBar";
import BlogSideBarContent from "../components/blog/BlogSideBarContent";


const BlogContainer = ({children}) => {
    return (

            <div className="container" data-aos="fade-up" data-aos-once='true'>
                <div className="row">
                    <div className="col-lg-8 mt-3">
                        {children}
                    </div>
                    <div className="col-lg-4 mt-3">
                        <SideBar>
                            <BlogSideBarContent/>
                        </SideBar>
                    </div>
                </div>
            </div>

    );
};


export default BlogContainer;