import Table from "../../reusables/table";

const Tat = () => {
    const theadData = ["Test","Cost", "Turn Around Time"];

    const tbodyData = [
        {
            id: "1",
            items: ["Salmonella Antigen Test", "700","45 minutes"],
        },
        {
            id: "2",
            items: ["Pregnancy Test", "200", "30 minutes"],
        },
        {
            id: "3",
            items: ["Rheumatoid Factor Test","200", "40 minutes"],
        },
        {
            id: "4",
            items: ["VDRL Test","200", "40 minutes"],
        },
        {
            id: "5",
            items: ["Brucellin Test","200", "40 minutes"],
        },
        {
            id: "6",
            items: ["Anti Streptolysin ","200", "40 minutes"],
        },
        {
            id: "7",
            items: ["Helicobacter Pylori Test","500", "45 minutes"],
        },
        {
            id: "8",
            items: ["Crag Test","500", "45 minutes"],
        },
         {
            id: "9",
            items: ["HbsAg Test ","300", "40 minutes"],
        },
        {
            id: "10",
            items: ["Occult Blood ","300", "40 minutes"],
        },
        {
            id: "11",
            items: ["PITC ","Free", "60 minutes"],
        },

    ];
    return (
        <>
            <Table
                theadData={theadData}
                tbodyData={tbodyData}
                tDescription=' SEROLOGY'
                customClass='table table-bordered'/>
        </>
    );
};

export default Tat;