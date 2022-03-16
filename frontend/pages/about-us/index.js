import Layout from "../../hoc/Layout";
import Plan from "../../components/about/Plan";
import Partners from "../../components/about/Partners";
import Board from "../../components/about/member/Board";
import Role from "../../components/about/Role";
import Goals from "../../components/about/Goals";
import GuidingPrinciples from "../../components/about/GuidingPrinciples";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Organogram from "../../components/about/Organogram";
import Neighbor from "../../components/about/Neighbor";

const Index = () => {
    return (
        <Layout>
            <Breadcrumbs/>
            <Organogram/>
            <Partners/>
            <Plan/>
            <GuidingPrinciples/>

            {/*<Board/>*/}
            <Role/>
            <Neighbor/>
            <Goals/>
        </Layout>
    );
};

export default Index;