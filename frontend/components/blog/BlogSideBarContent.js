import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {useEffect, useState} from "react";
import ShowItem from "./ShowItem";
import Search from "./Search";
import ShowCategories from "./ShowCategories";
import LoadRecentBlogs from "./LoadRecentBlogs";
import ShowTags from "./ShowTags";


const BlogSideBarContent = () => {
    const [blogs, setBlogs] = useState([])
    const [tags, setTags] = useState([])
    const [categories, setCategories] = useState([])

    const items = [
        {title: 'search', component: <Search/>},
        {title: 'categories', component: <ShowCategories categories={categories}/>},
        {title: 'Recent', component: <LoadRecentBlogs blogs={blogs}/>},
        {title: 'tags', component: <ShowTags tags={tags}/>},
    ]


    useEffect(() => {
        loadBlogsTagsCategories()
    }, [])


    const loadBlogsTagsCategories = () => {
        let skip = 0
        let limit = 4
        return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
            console.log('kufu',data)
            if (data.error) {
                console.log(data.error)
            } else {
                setTags(data.tags)
                setCategories(data.categories)
                setBlogs(data.blogs)
            }
        })
    };


    return <>
        {items.map((item, index) => {
            return <ShowItem ItemTitle={item.title.toLowerCase()} key={index}>
                {item.component}
            </ShowItem>
        })}
    </>


};

export default BlogSideBarContent;