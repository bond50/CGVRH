import React from 'react';
import StaffList from "../../components/crud/staff-list";
import Layout from "../../hoc/Layout";


const Index = () => {
    return (
     <Layout>
        <StaffList/>
     </Layout>
    );
};

export default Index;