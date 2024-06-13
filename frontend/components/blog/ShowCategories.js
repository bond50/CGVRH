import Link from "next/link";
import classes from '../../styles/ShowAllCategories.module.css'

const ShowCategories = ({categories}) => {

    const showAllCategories = () => {
        return categories && categories.map((c, i) => (
            <li key={i}>
                <Link href={`/categories/${c.slug}`}>
                    <a>{c.name} <span>({c.blogCount})</span></a>
                </Link>
            </li>
        ));
    };

    return (
        <ul className={classes.Categories}>
            {showAllCategories()}
        </ul>
    );
};

export default ShowCategories;