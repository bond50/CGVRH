const {google} = require("googleapis");


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
        facility,
        facilityCode,
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
    if (!eNo || !eNo.length) {
        return res.status(400).json({
            error: "You must provide your employment number",
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
    if
    (!email || !email.length) {
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
    if (!facility || !facility.length) {
        return res.status(400).json({
            error: "select your facility",
        });
    }
    if (!facilityCode || !facilityCode.length) {
        return res.status(400).json({
            error: "select your facility code use '16157' if your facility is VCRH",
        });
    }
    if (!hireDate || !hireDate.length) {
        return res.status(400).json({
            error: "Select Hire Date/Date Posted",
        });
    }
    if (!positionStatus || !positionStatus.length) {
        return res.status(400).json({
            error: "Select your Position Status",
        });
    }
    if (!specialityArr || !specialityArr.length) {
        return res.status(400).json({
            error: "Select your Speciality",
        });
    }
    if (!professionalBody || !professionalBody.length) {
        return res.status(400).json({
            error: "Select Professional Body",
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
            facility,
            facilityCode,
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
    res.send('Ok')
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: "vihiga.json",
    //     scopes: "https://www.googleapis.com/auth/spreadsheets",
    // });
    //
    // const client = await auth.getClient();
    // // Instance of Google Sheets API
    // const googleSheets = google.sheets({version: "v4", auth: client});
    // // Get metadata about spreadsheet
    //
    // const spreadsheetId = process.env.GOOGLE_SHEETS;
    //
    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId,
    // });
    //
    //
    // const getRows = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: "Worksheet",
    // });
    // res.json(getRows.data.values)


};
