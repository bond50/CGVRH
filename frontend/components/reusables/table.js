import React from 'react';
import TableHeadItem from "../table/TableHeadItem";
import TableRow from "../table/TableRow";
import classes from '../../styles/Table.module.css'

const Table = ({theadData, tbodyData, tDescription, customClass}) => (
    <div className='container'>
        <div className={classes.tableWrapper}>
            <div className={classes.tableTitle}>
                <div className="row">
                    <div className="col-sm-12"><h2>{tDescription}</h2></div>
                </div>
            </div>

            <table className={customClass}>
                <thead>
                <tr>
                    {theadData.map((h) => {
                        return <TableHeadItem key={h} item={h}/>;
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((item) => {
                    return <TableRow key={item.id} data={item.items}/>;
                })}
                </tbody>
            </table>
        </div>
    </div>
);

export default Table;