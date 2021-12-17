import React from 'react';
import GeneralPageWrapper from "./general-page-wrapper";
import SmallCard from "../components/reusables/card/small-card";

const TagCategoryWrapper = ({title, children}) => {
    return (
        <GeneralPageWrapper imgSrc='/fallback/services.jpg' title={title}
                            title2={`All Articles about ${title} `}
                            alt='fallback image'>
            <div className="row">{
                {children}
            }
            </div>
        </GeneralPageWrapper>
    );
};

export default TagCategoryWrapper;