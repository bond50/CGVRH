/* eslint-disable */
import {getServerSideSitemap, ISitemapField} from "next-sitemap";
import {GetServerSideProps} from "next";
import {API, DOMAIN} from "../../config";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const response = await fetch(`${API}/general`);
    const loadedPages: any[] = await response.json();


    const fields: ISitemapField[] = loadedPages.map((p) => ({
        loc: `${DOMAIN}/general/${p.slug}`,
        lastmod: new Date().toISOString(),
    }));

    return getServerSideSitemap(ctx, fields);
};

export default function Site() {
}