import React from "react";


const BlogsPending = ({slug}) => {


    const showBlogs = () => {
        return (
            data.map((blog,) => (
                <div className="form-check form-switch" key={blog._id}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={true}
                        id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{blog.text}</label>
                </div>

            ))
        );
    };


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Update <span>| {slug}</span></h5>
                {showBlogs()}
            </div>
        </div>
    );
};

export default BlogsPending;