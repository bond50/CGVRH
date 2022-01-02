import React from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/blog/header/header";

const Layout = ({children,data,categories}) => {
    return (
        <>
            <Header blogs={data} categories={categories}/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;