import Layout from "../../hoc/Layout";

import Board from "../../components/about/member/Board";
import useSWR from "swr";
import {API} from "../../config";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";

const Index = () => {
    const {data: members, error} = useSWR(
        [
            `${API}/users-hmt`,
        ],
        {
            revalidateOnFocus: true,
        },
    );


    return (
        <Layout>
            <Breadcrumbs/>
            <Board members={members}/>
        </Layout>
    );
};

export default Index;
