import React from 'react';
import classes from "./header.module.css";
import BlogSingleLink from "./blog-single-link";

const BlogLists = ({blogs}) => {


    return (
        <>
            {blogs && blogs.map(blog => {
                return <BlogSingleLink
                    key={blog._id}
                    text={blog.title}
                    to={`/blogs/${blog.slug}`}/>
            })}
        </>

    );
};

export default BlogLists;