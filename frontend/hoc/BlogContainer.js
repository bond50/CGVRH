import React from 'react';
import classes from "../styles/Blog.module.css";
import SideBar from "../components/blog/SideBar";
import ShowCategories from "../components/blog/ShowCategories";
import Search from "../components/blog/Search";
import ShowItem from "../components/blog/ShowItem";
import ShowTags from "../components/blog/ShowTags";
import LoadRecentBlogs from "../components/blog/LoadRecentBlogs";


const BlogContainer = ({children, categories, tags, blogs}) => {

    return (
        <section className={classes.Blog}>
            <div className="container" data-aos="fade-up">
                <div className="row">
                    <div className="col-lg-8">
                        {children}
                    </div>
                    <div className="col-lg-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, autem commodi culpa cupiditate est iste laboriosam laborum maiores placeat porro, quisquam quos reiciendis rerum sapiente sed soluta tempora veritatis voluptates?

                    </div>
                </div>
            </div>
        </section>
    );
};


export default BlogContainer;