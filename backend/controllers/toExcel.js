const spread_sheet = require('spread_sheet');
const row = "1,2,Jack,Pirate";
const filePath = 'C:\\Users\\madco\\OneDrive\\Desktop\\vcrh1.xlsx';

const sheetName = "Test";

spread_sheet.addRow(row,filePath,sheetName,function(err,result){
    console.log(err,result)
})