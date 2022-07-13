const {google} = require("googleapis");
const creds = require('../vihiga.json')
const {GoogleSpreadsheet} = require("google-spreadsheet");


exports.create = async (req, res) => {
    const {
        add,
        title,
        firstname,
        otherNames,
        surname,
        disabilityOption,
        idNo,
        eNo,
        dob,
        gender,
        ethnicityOpt,
        marital,
        county,
        telephone,
        email,
        mailingAddress,
        employeeStatus,
        designationStatus,
        positionTitle,
        hireDate,
        reasonForChangePreCurrentPosition,
        positionStatus,
        endDate,
        specialityArr,
        subSpecialityArr,
        professionalBody,
        registrationNo,
        licenceNo,
        employer,
        employmentTerms,
        hiv
    } = req.body


    if (!title || !title.length) {
        return res.status(400).json({
            error: "Title required",
        });
    }
    if
    (!firstname || !firstname.length) {
        return res.status(400).json({
            error: "You must enter your firstname",
        });
    }

    if
    (!surname || !surname.length) {
        return res.status(400).json({
            error: "You must enter your surname",
        });
    }
    if (!idNo || !idNo.length) {
        return res.status(400).json({
            error: "You must provide your identification number",
        });
    }

    if (!dob || !dob.length) {
        return res.status(400).json({
            error: "Date of birth is required",
        });
    }
    if (!gender || !gender.length) {
        return res.status(400).json({
            error: "Select your gender",
        });
    }
    if (!ethnicityOpt || !ethnicityOpt.length) {
        return res.status(400).json({
            error: "select your ethnicity ",
        });
    }
    if (!marital || !marital.length) {
        return res.status(400).json({
            error: "Select marital status",
        });
    }
    if (!county || !county.length) {
        return res.status(400).json({
            error: "Select the county of residence",
        });
    }
    if (!email || !email.length) {
        return res.status(400).json({
            error: "Enter your email",
        });
    }
    if (!employeeStatus || !employeeStatus.length) {
        return res.status(400).json({
            error: "select your employment status",
        });
    }
    if (!designationStatus || !designationStatus.length) {
        return res.status(400).json({
            error: "select your designation",
        });
    }
    if (!positionTitle || !positionTitle.length) {
        return res.status(400).json({
            error: "Enter your position Title",
        });
    }

    if (!hireDate || !hireDate.length) {
        return res.status(400).json({
            error: "Select Hire Date/Date Posted",
        });
    }


    if (!employer || !employer.length) {
        return res.status(400).json({
            error: "Select Your employer",
        });
    }

    if (!employmentTerms || !employmentTerms.length) {
        return res.status(400).json({
            error: "Select Terms of employment ",
        });
    }


    const data = (
        {
            add,
            title,
            firstname,
            otherNames,
            surname,
            disabilityOption,
            idNo,
            eNo,
            dob,
            gender,
            ethnicityOpt,
            marital,
            county,
            telephone,
            email,
            mailingAddress,
            employeeStatus,
            designationStatus,
            positionTitle,
            facility: "Vihiga County Referral Hospital",
            facilityCode: "16157",
            hireDate,
            endDate,
            reasonForChangePreCurrentPosition,
            positionStatus,
            specialityArr,
            subSpecialityArr,
            professionalBody,
            registrationNo,
            licenceNo,
            employer,
            employmentTerms,
            hiv
        }
    )


    function replaceUndefinied() {
        const str = JSON.stringify(data, function (key, value) {
            return (value === undefined) ? "" : value
        });
        return JSON.parse(str);
    }


    const propertyValues = Object.values(replaceUndefinied());


    const auth = new google.auth.GoogleAuth({
        keyFile: "vihiga.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({version: "v4", auth: client});
    const spreadsheetId = process.env.GOOGLE_SHEETS;

    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Worksheet",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [propertyValues],
        },
    });


    res.json({
        message: `Successfully submitted! Thank you!`,
    });

};


exports.list = async (req, res) => {
    let list = []
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows(); // can pass in { limit, offset }
    rows.forEach(person => {
        list.push(
            {title:person.Title,firstname: person.FirstName, otherNames: person.OtherNames, surname: person.Surname})
    })
    list = list.filter((v) => v.firstname !== '');
    res.json(list)
};
