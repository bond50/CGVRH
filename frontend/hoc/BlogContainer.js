import React, {Fragment} from 'react';
import classes from "../styles/Blog.module.css";
import SideBar from "../components/blog/SideBar";
import BlogSideBarContent from "../components/blog/BlogSideBarContent";


const BlogContainer = ({children}) => {
    return (

        <section className={classes.Blog}>
            <div className="container" data-aos="fade-up" data-aos-once='true'>
                <div className="row">
                    <div className="col-lg-8">
                        {children}
                    </div>
                    <div className="col-lg-4">
                        <SideBar>
                            <BlogSideBarContent/>
                        </SideBar>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default BlogContainer;