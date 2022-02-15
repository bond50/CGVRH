import Link from "next/link";
import classes from '../../styles/ShowAllTags.module.css'

const ShowTags = ({tags}) => {
        const showAllTags = () => {
            return tags && tags.map((t, i) => (
                <li key={i}>
                    <Link href={`/tags/${t.slug}`} key={i}>
                        <a>{t.name}</a>
                    </Link>
                </li>
            ));
        };
        return (


            <ul className={classes.Tags}>
                {showAllTags()}
            </ul>

        );
    }
;

export default ShowTags;