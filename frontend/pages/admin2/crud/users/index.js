import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Preloader from '../../../../components/preloader';

const Admin = dynamic(() => import('../../../../components/auth/Admin'), { ssr: false, loading: () => <Preloader /> });
const Layout = dynamic(() => import('../../../../hoc/admin/layout/layout'), { ssr: false, loading: () => <Preloader /> });
const Alert = dynamic(() => import('../../../../components/messages/Alert'), { ssr: false, loading: () => <Preloader /> });
const CardDetail = dynamic(() => import('../../../../components/admin/home/card-detail'), { ssr: false, loading: () => <Preloader /> });
const DynamicTableRows = dynamic(() => import('../../../../components/admin/home/dynamic-table-rows'), { ssr: false, loading: () => <Preloader /> });
const MyModal = dynamic(() => import('../../../../components/reusables/ui/modal'), { ssr: false, loading: () => <Preloader /> });
import useFetchUsers from '../../../../hooks/useFetchUsers';
import { API } from '../../../../config';

const Index = () => {
    const {
        mouseMoveHandler,
        deleteUser,
        handleShow,
        handleClose,
        show,
        loading,
        error,
        removed,
        users,
        message
    } = useFetchUsers(`${API}/all-users`);

    const tHeads = [
        { span: '1', title: 'Names' },
        { span: '1', title: 'Username' },
        { span: '1', title: 'Role' },
        { span: '1', title: 'Email' },
        { span: '3', title: 'Action' },
    ];

    function showTableHead() {
        return tHeads.map((col, i) => (
            <th scope="col" key={i} colSpan={col.span}>
                {col.title}
            </th>
        ));
    }

    function showUsers() {
        if (loading) {
            return (
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        }
        if (error) {
            return <Alert msg={error} label="Danger" type="danger" />;
        }

        return (
            users.length > 0 && (
                <CardDetail title="Users at this facility" spanText="Active users" tableHead={showTableHead()}>
                    {users.map(user => (
                        <DynamicTableRows key={user._id} user={user} showModal={handleShow} />
                    ))}
                </CardDetail>
            )
        );
    }

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Admin>
                <Layout>
                    <div onMouseMove={mouseMoveHandler}>
                        {removed && <Alert msg={message} label="Success" type="success" reload />}
                        {showUsers()}
                        {show &&
                            users.map((u, i) => (
                                <MyModal
                                    key={i}
                                    show={show}
                                    titleMessage="Delete confirm"
                                    bodyMessage={`Are you sure you want to delete ${u.name}`}
                                    handleChanges={() => deleteUser(u._id)}
                                    handleClose={handleClose}
                                />
                            ))}
                    </div>
                </Layout>
            </Admin>
        </>
    );
};

export default Index;
