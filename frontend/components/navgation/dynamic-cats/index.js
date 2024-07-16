import useSWR from "swr";
import { API } from "../../../config";
import { fetcher } from "../../../axios/axios";

const DynamicCats = () => {
    const { data, error } = useSWR([`${API}/page-cats`], fetcher, {
        revalidateOnFocus: true,
    });

    if (error) {
        return [];
    }

    if (!data) {
        return [];
    }

    // Assuming data is an array of objects with id, name, and slug properties
    return data.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
    }));
};

export default DynamicCats;
