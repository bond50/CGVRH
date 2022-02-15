import React from 'react';
import {API} from "../../../../config";
import Alert from "../../../../components/messages/Alert";
import CardDetail from "../../../../components/admin/home/card-detail";
import DynamicTableRows from "../../../../components/admin/home/dynamic-table-rows";
import MyModal from "../../../../components/reusables/ui/modal";
import Layout from "../../../../hoc/admin/layout/layout";
import Admin from "../../../../components/auth/Admin";
import useFetchUsers from "../../../../hooks/useFetchUsers";

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
    } = useFetchUsers(`${API}/all-users`)

    const tHeads = [
        {span: '1', title: 'Names'},
        {span: '1', title: 'username'},
        {span: '1', title: 'role'},
        {span: '1', title: 'email'},
        {span: '3', title: 'Action'},
    ]

    function showTableHead() {
        return tHeads.map((col, i) => {
            return <th
                scope="col"
                key={i}
                colSpan={col.span}>{col.title
            }</th>
        })

    }

    function showUsers() {
        if (loading) {
            return <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        if (error) {
            return <Alert msg={error} label='Danger' type='danger'/>
        }

        return users.length > 0 && <CardDetail
            title='Users at this facility'
            spanText={'Active users'}
            tableHead={showTableHead()}>
            {users.map(user => {
                return <DynamicTableRows
                    key={user._id}
                    user={user}
                    showModal={handleShow}/>
            })}
        </CardDetail>

    }


    return (
        <Admin>
            <Layout>

                <div onMouseMove={mouseMoveHandler}>
                    {removed && <Alert msg={message} label='Success' type='success' reload/>}
                    {showUsers()}
                    {show && users.map((u, i) => {
                        return <MyModal
                            key={i}
                            show={show} titleMessage='Delete confirm'
                            bodyMessage={`Are you sure you want to delete ${u.name}`}
                            handleChanges={() => deleteUser(u._id)}
                            handleClose={handleClose}/>
                    })}
                </div>

            </Layout>
        </Admin>
    );
};

export default Index;