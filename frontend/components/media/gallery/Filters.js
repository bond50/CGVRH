import classes from '../../../styles/Filters.module.css'



const Filters = ({filters, handleTagClick, active}) => {
    const returnFilters = () => filters&&filters.map((f, i) => {
        return <li
            key={i}
            className={`${classes.Filter} ${f === active ? classes.active : null}`}
            onClick={() => {
                handleTagClick(f)

            }}>{f.split('-').join(' ')}
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

export default Filters;