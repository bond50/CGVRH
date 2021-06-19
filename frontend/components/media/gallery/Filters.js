import Filter from "./Filter";
import classes from '../../../styles/Filters.module.css'

const Filters = ({filters, handleTagClick}) => {

    const returnFilters = () => filters.map((f, i) => {
        return <Filter key={i} name={f} clicked={() => {handleTagClick(f)}}/>
    });

    return (
        <ul className={`${classes.Filters}`}>
            {returnFilters()}
        </ul>
    );
};

export default Filters;