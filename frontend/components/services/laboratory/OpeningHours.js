import Table from "../../reusables/table";

const OpeningHours = () => {
    const theadData = ["Days", "Operating Hours"];

    const tbodyData = [
        {
            id: "1",
            items: ["Monday - Friday", "8:00 Am-6:30pm"],
        },
        {
            id: "2",
            items: ["Night Shift", "6:30 Pm-8:00 Am"],
        },
        {
            id: "3",
            items: ["Weekends and Public Holidays", "8:00 Am-6:30pm"],
        },
    ];
    return (
        <>
            <Table
                theadData={theadData}
                tbodyData={tbodyData}
                tDescription='The Vihiga County Referral Hospital Laboratory provides a 24 hours service(Monday to Sunday) The shifts are as follows:'
                customClass='table table-bordered'/>
        </>
    );
};

export default OpeningHours;