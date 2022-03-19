import React from 'react'
import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8"/>
                    <link rel="shortcut icon" href="/favicon.ico"/>
                    <link href="https://fonts.gstatic.com" rel="preconnect"/>
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
                        rel="stylesheet"/>

                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                          rel="stylesheet"
                          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                          crossOrigin="anonymous"/>


                    <link href="/theme/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>

                    <link href="/theme/fontawesome/css/all.min.css" rel="stylesheet"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
