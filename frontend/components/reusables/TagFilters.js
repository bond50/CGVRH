import classes from '../../styles/Filters.module.css'
import Link from "next/link";

const TagFilters = ({filters}) => {
    const returnFilters = () => filters && filters.map(tag => {
        return <li key={tag._id}>
            <Link href={`/document-tags/${tag.slug}`}>
                <a>{tag.name}</a>
            </Link>
        </li>
    });

    return (
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
                <ul className={`${classes.Filters}`}>
                    {returnFilters()}
                </ul>
            </div>
        </div>

    );
};

export default TagFilters;