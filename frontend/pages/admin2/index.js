import Layout from "../../hoc/admin/layout/layout";
import Home from "../../components/admin/home/home-page";
import Admin from "../../components/auth/Admin";
import useSWR from "swr";
import {API} from "../../config";

const Index = () => {
        const {data: services, error: serviceError} = useSWR(`${API}/featured-services`)
    return (
        <Admin>
            <Layout>
                <Home/>
            </Layout>
        </Admin>
    );
};

export default Index;