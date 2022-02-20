import classes from './download-filters.module.css';

const Filters = ({buttons, active, handleTagFilter}) => {


    function showFilter() {
        return buttons.map(tag => {
            return <li
                className={active === tag._id ? classes.active : ''}
                key={tag._id}
                onClick={() => handleTagFilter(tag._id)}>{tag.name}</li>
        })

    }

    return (
        <div className='container'>
            <div className="row" data-aos="slide-up">
                <div className="col-lg-12 d-flex justify-content-center">
                    <ul className={classes.Filters} >
                        {showFilter()}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Filters;