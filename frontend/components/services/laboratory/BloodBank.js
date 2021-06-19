import Table from "../../reusables/table";

const BloodBank = () => {
    const theadData = ["Test","Cost", "Turn Around Time "];

    const tbodyData = [
        {
            id: "1",
            items: ["Blood For Cross-match", "1000","60 minutes"],
        },
        {
            id: "2",
            items: ["Blood For Blood Grouping", "200", "30 minutes"],
        },
        {
            id: "3",
            items: ["Blood For antibodies screening","200", "60 minutes"],
        },
        {
            id: "4",
            items: ["Blood For Coombs/DU","200", "60 minutes"],
        },


    ];
    return (
        <>
            <Table
                theadData={theadData}
                tbodyData={tbodyData}
                customClass='table table-bordered'/>
        </>
    );
};

export default BloodBank;