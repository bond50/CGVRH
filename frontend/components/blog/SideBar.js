import classes from '../../styles/SideBar.module.css'
import Search from "./Search";
import ShowCategories from "./ShowCategories";
import LoadRecentBlogs from "./LoadRecentBlogs";
import ShowTags from "./ShowTags";
import React from "react";
import ShowItem from "./ShowItem";

const SideBar = ({tags,categories,blogs}) => {
    const items = [
        {title: 'search', component: <Search/>},
        {title: 'categories', component: <ShowCategories categories={categories}/>},
        {title: 'Recent', component: <LoadRecentBlogs blogs={blogs}/>},
        {title: 'tags', component: <ShowTags tags={tags}/>},
    ]

    return <div className={classes.SideBar}>
        {items.map((item, index) => {
            return <ShowItem ItemTitle={item.title.toLowerCase()} key={index}>
                {item.component}
            </ShowItem>
        })}

    </div>;
};
export default SideBar;