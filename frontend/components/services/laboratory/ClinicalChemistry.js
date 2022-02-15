import Table from "../../reusables/table";

const ClinicalChemistry = () => {
    const theadData = ["Test", "Cost", "T.A.T "];

    const tbodyData = [
        {
            id: "1",
            items: ["CD4 Analysis", "free", "60 minutes"],
        },
        {
            id: "2",
            items: ["Renal Functional Test", "1300", "60 minutes"],
        },
        {
            id: "3",
            items: ["Liver Functional Test", "1500", "60 minutes"],
        },
        {
            id: "4",
            items: ["Blood Sugar", "free", "30 minutes"],
        },
        {
            id: "5",
            items: ["Urinalysis (Microscopy and Biochemistry)", "200", "30 minutes"],
        },
        {
            id: "6",
            items: ["HbA1c (Glycated hemoglobin)", "2500", "60 minutes"],
        },
        {
            id: "7",
            items: ["Bilirubin (Total and Direct)", "600", "60 minutes"],
        },
        {
            id: "8",
            items: ["Electrolytes Sodium ion (Na+),Potassium(K+),Chloride(Cl-)", "600", "45 minutes"],
        },
        {
            id: "9",
            items: ["CSF Protein/Glucose", "400", "35 minutes"],
        },
        {
            id: "10",
            items: ["Thyroid Function Test ((TSH),Free Triiodothyronine (FT3), (FT4))", "2500", "60 minutes"],
        },
        {
            id: "11",
            items: ["Free Prostate Specific Antigen (PSA)", "1500", "60 minutes"],
        }, {
            id: "12",
            items: ["Follicle stimulating Hormone (FSH)", "1500", "60 minutes"],
        },
        {
            id: "13",
            items: ["Luteinizing Hormone (LH)(FSH)", "1500", "60 minutes"],
        },
        {
            id: "14",
            items: ["Alpha Feto Protein (AFP)", "1500", "60 minutes"],
        }, {
            id: "15",
            items: ["Hepatitis B Surface Antigen (HBsAg)", "200", "60 minutes"],
        },
        {
            id: "16",
            items: ["Hepatitis C Virus (HCV)", "200", "60 minutes"],
        },
        {
            id: "17",
            items: ["Human Chronic Gonadotropin (HCG)", "200", "60 minutes"],
        },
        {
            id: "18",
            items: ["C-Reactive Protein(CRP))", "1500", "60 minutes"],
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

export default ClinicalChemistry;