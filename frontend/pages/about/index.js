import Layout from "../../hoc/Layout";
import Plan from "../../components/about/Plan";
import Partners from "../../components/about/Partners";
import Board from "../../components/about/member/Board";
import Role from "../../components/about/Role";
import Goals from "../../components/about/Goals";
import GuidingPrinciples from "../../components/about/GuidingPrinciples";

const Index = () => {
    return (
        <Layout>
            <Plan/>
            <GuidingPrinciples/>
            <Partners/>
            <Board/>
            <Role/>
            <Goals/>
        </Layout>
    );
};

export default Index;