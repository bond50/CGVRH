import Admin from '../../../../components/auth/Admin';
import Layout from "../../../../hoc/admin/layout/layout";
import CertRead from '../../../../components/crud/certificate/CertRead';


const Certs = () => {
    return (
        <Layout pageTitle='Manage Certs'>
            <Admin>
                <CertRead/>
            </Admin>
        </Layout>
    );
};

export default Certs;