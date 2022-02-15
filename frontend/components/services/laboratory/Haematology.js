import Table from "../../reusables/table";

const Haematology = () => {
    const theadData = ["Test", "Cost", "Turn Around Time "];

    const tbodyData = [
        {
            id: "1",
            items: ["Hemoglobin Estimation", "100", "30 minutes"],
        },
        {
            id: "2",
            items: ["Full Haemogram", "500", "60 minutes"],
        },
        {
            id: "3",
            items: ["Erythrocyte sedimentation Rate", "100", "90 minutes"],
        },
        {
            id: "4",
            items: ["Sickling Test", "300", "40 minutes"],
        },
        {
            id: "5",
            items: ["Peripheral Blood Film", "300", "60 minutes"],
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

export default Haematology;