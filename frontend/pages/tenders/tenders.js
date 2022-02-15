import Layout from "../../hoc/Layout";
import Tenders from "../../components/tender/Tenders";
import {getFilesFromCloud} from "../../actions/gallery";


const Index = ({tenders}) => {

    const renderTenders = () => tenders.map(tender => {
        console.log(tender)
    });

    return (
        <Layout>
            <div className="container pt-5 mt-4">
                <table className="table ">
                    <thead>
                    <tr>
                        <th scope="col">ITEM</th>
                        <th scope="col">NUMBER</th>
                        <th scope="col">DESCRIPTION</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">2</th>
                        {renderTenders()}
                        <td>Jacob</td>
                        <td>Jacob</td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


export const getServerSideProps = async (context) => {

        let folder = "Tenders";

        return getFilesFromCloud({folder: 'Tenders'}).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                return {
                    props: {
                        tenders: data,
                    },
                };
            }
        });
    }
;

export default Index;