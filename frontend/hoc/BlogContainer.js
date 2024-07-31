import SideBar from "../components/blog/SideBar";
import BlogSideBarContent from "../components/blog/BlogSideBarContent";
import AdBanner from "../components/adsense/AdBanner";
import React from "react";


const BlogContainer = ({children}) => {
    return (

        <div className="container" data-aos="fade-up" data-aos-once='true'>
            <div className="row">
                <div className="col-lg-8 mt-3">
                    {children}
                    <div className="container py-4">
                        <AdBanner/>
                    </div>
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