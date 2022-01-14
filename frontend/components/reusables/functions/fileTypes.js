const React = require("react");
exports.fileTypes = (ext) => {

    switch (ext) {
        case ("application/msword" ||
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template" ||
            "application/vnd.ms-word.document.macroEnabled.12" ||
            "application/vnd.ms-word.template.macroEnabled.12"):
            return <img src="https://img.icons8.com/color/48/000000/ms-word--v1.png" alt={`ms-word--v1.png`}/>
        case ("application/vnd.ms-excel" ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template" ||
            "application/vnd.ms-excel.sheet.macroEnabled.12" ||
            "application/vnd.ms-excel.template.macroEnabled.12" ||
            "application/vnd.ms-excel.addin.macroEnabled.12" ||
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12"):
            return <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt={`ms-excel.png`}/>
        case 'application/pdf':
            return  <img src="https://img.icons8.com/color/48/000000/adobe-acrobat--v2.png" alt={`adobe-acrobat--v2.png`}/>

        case ("application/vnd.ms-powerpoint" ||
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
            "application/vnd.openxmlformats-officedocument.presentationml.template" ||
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow" ||
            "application/vnd.ms-powerpoint.addin.macroEnabled.12" ||
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12" ||
            "application/vnd.ms-powerpoint.template.macroEnabled.12" ||
            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"):
            return <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt={`ms-excel.png`}/>
        default:
           return <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt={`ms-excel.png`}/>;


    }
    return ext;
};