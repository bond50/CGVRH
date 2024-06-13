// utils.js
import parse, {domToReact} from 'html-react-parser';

export const stripTags = (htmlString, tagsToRemove) => {
    const options = {
        replace: ({name, children}) => {
            if (tagsToRemove.includes(name)) {
                return <>{domToReact(children, options)}</>;
            }
        }
    };
    return parse(htmlString, options);
};

export const stripAllTags = (htmlString, tagsToRemove = []) => {
    if (tagsToRemove.length === 0) {
        // If no tags to remove are specified, remove all tags
        return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
    }

    const options = {
        replace: ({name, children}) => {
            if (tagsToRemove.includes(name)) {
                return <>{domToReact(children, options)}</>;
            }
        }
    };
    return parse(htmlString, options);
};


