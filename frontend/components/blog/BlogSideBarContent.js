import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { useEffect, useState } from "react";
import ShowItem from "./ShowItem";
import Search from "./Search";
import ShowCategories from "./ShowCategories";
import LoadRecentBlogs from "./LoadRecentBlogs";
import ShowTags from "./ShowTags";

const BlogSideBarContent = () => {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const items = [
        { title: 'search', component: <Search /> },
        { title: 'categories', component: <ShowCategories categories={categories} /> },
        { title: 'Recent', component: <LoadRecentBlogs blogs={blogs} /> },
        { title: 'tags', component: <ShowTags tags={tags} /> },
    ];

    useEffect(() => {
        let isMounted = true; // flag to check if component is still mounted

        const loadBlogsTagsCategories = async () => {
            try {
                let skip = 0;
                let limit = 4;
                const data = await listBlogsWithCategoriesAndTags(skip, limit);
                if (isMounted) {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        setTags(data.tags);
                        setCategories(data.categories);
                        setBlogs(data.blogs);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadBlogsTagsCategories();

        return () => {
            isMounted = false; // cleanup function sets the flag to false
        };
    }, []);

    return (
        <>
            {items.map((item, index) => (
                <ShowItem ItemTitle={item.title.toLowerCase()} key={index}>
                    {item.component}
                </ShowItem>
            ))}
        </>
    );
};

export default BlogSideBarContent;
