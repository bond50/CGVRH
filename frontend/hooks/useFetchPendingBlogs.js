import useSWR from "swr";
import {API} from "../config";
import {fetcher} from "../components/reusables/functions/fetcher";
import {getCookie} from "../actions/auth";

export function useFetchPendingBlogs() {
    const token = getCookie('token');
    const {data, error} = useSWR([
            `${API}/pending-blogs`,
            null,
            token
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },)
    if (error) <p>Loading failed...</p>;
    if (!data) <div className='preloader'/>
    return {data, error}
}



