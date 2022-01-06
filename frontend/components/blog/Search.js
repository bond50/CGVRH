import Link from 'next/link';
import classes from '../../styles/SidebrSearchForm.module.css'
import {useState, useEffect} from 'react';
import {listSearch} from '../../actions/blog';

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const {search, results, searched, message} = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({search}).then(data => {
            console.log(data)
            setValues({...values, results: data, searched: true, message: `${data.length} items found`});

        });
    };

    const handleChange = e => {
        setValues({...values, search: e.target.value, searched: false, results: []});
    };

    const searchedBlogs = (results = []) => {

        return (
            <div className={classes.Searched} >
                {message && <p className="container pt-3 text-muted">{message}</p>}
                {results.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className={`text-primary ${classes.Text}`}>{blog.title.toLowerCase()}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form className={classes.Form} onSubmit={searchSubmit}>
            <input placeholder="Search here" type="search" onChange={handleChange}/>
            <button
                type="submit"
                className={classes.Button}>
                <i className={`bi bi-search`}/>
            </button>
        </form>
    );

    return (
        <>
            {searchForm()}
            {searched && <div>{searchedBlogs(results)}</div>}
        </>
    );
};

export default Search;