import React, {useEffect, useState} from 'react';
import Column from "./Column";
import styles from "../../styles/Util.module.css";
import {listBlogsWithCategoriesAndTags} from "../../actions/blog";
import {useRouter} from "next/router";

const LatestBlogs = () => {
    const router = useRouter()

    const [loadedBlogs, setLoadedBlogs] = useState([]);
    useEffect(() => {
        loadMore()
    }, [])



    const loadMore = () => {
        listBlogsWithCategoriesAndTags(0,4).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
            }
        });
    };



    // const renderList = () => {
    //     return list.map((item, index) => {
    //         return <Column
    //             to={item.link}
    //             title={item.title}
    //             delay={item.delay}
    //             classname={`col-lg-4 col-md-6 ${item.classname}`}
    //             key={index} btnCaption='See more'>
    //             <li>{item.para}</li>
    //         </Column>
    //
    //     })

    //}


    return (
        <section className={`${styles.Section} `}>
            <div className="container">
                <div className={styles.SectionTitle} data-aos="zoom-out" data-aos-once='true'>
                    <h2>Latest Articles </h2>
                </div>

                <div className="row">
                    {JSON.stringify(loadedBlogs)}
                </div>
            </div>
        </section>

    )
}

export default LatestBlogs;