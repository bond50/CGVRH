import React, {useEffect, useState} from "react";
import {listTrending} from "../../actions/blog"; // Import the action
import SmallCard from "../../components/reusables/card/small-card";

const TrendingBlogs = () => {
    const [trendingBlogs, setTrendingBlogs] = useState([]);
    useEffect(() => {
        loadTrendingBlogs();
    }, []);

    const loadTrendingBlogs = () => {
        listTrending().then(data => {
            if (!data) {
                return {
                    notFound: true,
                };
            }
            if (data.error) {
                console.log(data.error);
            } else {
                setTrendingBlogs(data);
            }
        });
    };

    const showTrendingBlogs = () => {
        return trendingBlogs.map(blog => (
            <div className="col-lg-4 col-md-6" key={blog._id}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ));
    };

    return (
        <div className="container">
            <h4 className="text-center pt-2 pb-2 h2">Trending Blogs</h4>
            <div className="row">{showTrendingBlogs()}</div>
        </div>
    );
};

export default TrendingBlogs;
