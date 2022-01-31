import React from 'react';
import classes from "./index.module.css";

const tHeads = [
    {span: '1', title: 'Content Creator'},
    {span: '1', title: 'Content title'},
    {span: '1', title: 'Date created'},
    {span: '1', title: 'Status'},
    {span: '2', title: 'Action'},
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


const CardDetail = ({children, spanText, tableHead, title}) => {

    return (
        <>
            <div className="col-12">
                <div className={`card ${classes.Card}`}>
                    <div className={`card-body ${classes.CardBody}`}>
                        <h5 className={`card-title ${classes.CardTitle}`}>{title}<span>| {spanText}</span></h5>
                        <div className="table-responsive">
                            <table className="table table-borderless ">
                                <thead>
                                <tr>
                                    {tableHead}
                                </tr>
                                </thead>
                                <tbody>
                                {children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};
CardDetail.defaultProps = {
    tableHead: showTableHead(),
}
export default CardDetail;