import classes from '../../../styles/Filters.module.css'
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../reusables/functions/fetcher";
import Link from "next/link";
import {useEffect, useState} from "react";


const Filters = () => {
    const [tags, setTags] = useState([])

    const {data: filters, error} = useSWR(
        [
            `${API}/gallery-tags`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    useEffect(() => {
        setTags(filters)
        setTags(...tags,)
    }, [])



    const returnFilters = () => filters && filters.map(f => {
        return <li
            key={f._id}
            className={`${classes.Filter}`}
            // className={`${classes.Filter} ${f === active ? classes.active : null}`}
        >
            <Link href={`/media/gallery/tags/${f.slug}`}>
                {f.name}
            </Link>
        </li>
    });

    return (
        <div className="row pt-5">
            <div className="col-lg-12 d-flex justify-content-center">
                <ul className={`${classes.Filters}`}>
                    {returnFilters()}
                </ul>
            </div>
        </div>

    );
};

export default Filters;