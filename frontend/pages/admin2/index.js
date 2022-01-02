import Layout from "../../hoc/admin/layout/layout";
import Home from "../../components/admin/home/home-page";
import Admin from "../../components/auth/Admin";


const Index = () => {

    return (
        <Admin>
            <Layout>
                <Home/>
            </Layout>
        </Admin>
    );
};

export default Index;