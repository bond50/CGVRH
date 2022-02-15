import Layout from "../../hoc/Layout";

import Board from "../../components/about/member/Board";
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../../components/reusables/functions/fetcher";

const Index = () => {
    const {data: members, error} = useSWR(
        [
            `${API}/users-hmt`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );


    return (
        <Layout>
            <Board members={members}/>
        </Layout>
    );
};

export default Index;
