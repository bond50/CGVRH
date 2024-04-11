// dynamic-cats.js
import useSWR from "swr";
import {API} from "../../../config";
import {fetcher} from "../../reusables/functions/fetcher";


const DynamicCats = () => {
    const { data, error } = useSWR(
        [`${API}/page-cats`],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    console.log('API',API)

    if (error) {
        return <p>Failed to load categories</p>;
    }

    if (!data) {
        return []
    }

    console.log('data',data)

    // Assuming data is an array of objects with id, name, and slug properties
    return data.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
    }));
};

export default DynamicCats;
