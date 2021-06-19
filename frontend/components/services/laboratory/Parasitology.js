import Table from "../../reusables/table";

const Parasitology = () => {
    const theadData = ["Test","Cost", "Turn Around Time "];

    const tbodyData = [
        {
            id: "1",
            items: ["Blood Slide For Parasites", "100 under 5 Years Free","60 minutes"],
        },
        {
            id: "2",
            items: ["Stool For Ova And Cyst", "100", "45 minutes"],
        },
        {
            id: "3",
            items: ["HVS(Wet Prep)","1500", "200 minutes"],
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

export default Parasitology;