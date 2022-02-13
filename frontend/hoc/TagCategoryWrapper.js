import React from 'react';
import GeneralPageHeader from "./general-page-header";
import SmallCard from "../components/reusables/card/small-card";

const TagCategoryWrapper = ({title, children}) => {
    return (
        <GeneralPageHeader imgSrc='/fallback/services.jpg' title={title}
                           title2={`All Articles about ${title} `}
                           alt='fallback image'>
            <div className="row">{
                {children}
            }
            </div>
        </GeneralPageHeader>
    );
};

export default TagCategoryWrapper;