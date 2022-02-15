import Table from "../../reusables/table";

const Microbiology = () => {
    const theadData = ["Test", "Cost", "Turn Around Time "];

    const tbodyData = [
        {
            id: "1",
            items: ["CSF Analysis", "500", "30 minutes"],
        },
        {
            id: "2",
            items: ["Indian ink", "200", "30 minutes"],
        },
        {
            id: "4",
            items: ["Gram stain", "200", "40 minutes"],
        },
        {
            id: "5",
            items: ["Gene Xpert", "free", "24 hours"],
        },
        {
            id: "6",
            items: ["AAFB", "free", "24 hours"],
        },
        {
            id: "7",
            items: ["Semen Analysis", "600", "60 minutes"],
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

export default Microbiology;