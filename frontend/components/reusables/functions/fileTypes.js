const fileTypes = (ext) => {
    let fileExtension = null
    switch (ext) {
        case "application/msword" :
        case "application/doc" :
        case "application/ms-doc":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.template" :
        case "application/vnd.ms-word.document.macroEnabled.12" :
        case "application/vnd.ms-word.template.macroEnabled.12":
            fileExtension = <img src="https://img.icons8.com/color/48/000000/ms-word--v1.png" alt={`ms-word--v1.png`}/>
            break
        case "application/vnd.ms-excel" :
        case "application/excel":
        case "application/x-excel":
        case "application/x-msexcel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.template" :
        case "application/vnd.ms-excel.sheet.macroEnabled.12" :
        case "application/vnd.ms-excel.template.macroEnabled.12" :
        case "application/vnd.ms-excel.addin.macroEnabled.12" :
        case "application/vnd.ms-excel.sheet.binary.macroEnabled.12":
            fileExtension = <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt={`ms-excel.png`}/>
            break
        case 'application/pdf':
            fileExtension = <img src="https://img.icons8.com/color/48/000000/adobe-acrobat--v2.png"
                                 alt={`adobe-acrobat--v2.png`}/>
            break

        case "application/vnd.ms-powerpoint" :
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation" :
        case"application/vnd.openxmlformats-officedocument.presentationml.template" :
        case"application/vnd.openxmlformats-officedocument.presentationml.slideshow" :
        case"application/vnd.ms-powerpoint.addin.macroEnabled.12" :
        case "application/vnd.ms-powerpoint.presentation.macroEnabled.12" :
        case "application/vnd.ms-powerpoint.template.macroEnabled.12" :
        case "application/vnd.ms-powerpoint.slideshow.macroEnabled.12":
            fileExtension = <img src="https://img.icons8.com/color/48/000000/ms-excel.png" alt={`ms-excel.png`}/>
            break
        default:
            fileExtension = null

    }
    return fileExtension;
};
export default fileTypes