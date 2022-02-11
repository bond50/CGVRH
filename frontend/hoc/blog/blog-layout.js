import React from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/blog/header/header";
import useSWR from "swr";
import {API} from "../../config";
import {fetcher} from "../../components/reusables/functions/fetcher";
import Link from "next/link";



const Layout = ({children}) => {
    const {data, error} = useSWR(
        [
            `${API}/categories`,
        ],
        fetcher,
        {
            revalidateOnFocus: true,
        },
    );
    if (error) {
        return <p>failed to load categories</p>
    }

    if (!data) {
        return <p>Loading categories</p>
    }


    return (
        data.length > 0 ? <>
            <Header categories={data}/>
            <main>
                {children}
            </main>
            <Footer/>
        </> : <div className='container mt-5'>
            <p>Oops,Nothing to show now</p>
            <Link href={'/'}>
                <a>
                    <p>Return to Home page</p>
                </a>
            </Link>

        </div>
    );
};

export default Layout;