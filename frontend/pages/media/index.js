import Layout from "../../hoc/Layout";
import Breadcrumbs from "../../components/reusables/Breadcrumbs";
import Link from "next/link";

const Index = () => {
    return (
        <Layout>
            <Breadcrumbs/>
            <section>
                <div className="container page-intro">
                    <h4>Useful Media Links</h4>
                    <ul>
                        <li>
                            <i className="bi bi-chevron-double-right"/>
                            <Link href={`/media/downloads`}>
                                <a>Downloads</a>
                            </Link>
                        </li>
                        <li>
                            <i className="bi bi-chevron-double-right"/>
                            <Link href={`/media/gallery`}>
                                <a>The hospital Gallery</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
        </Layout>
    )
        ;
};

export default Index;