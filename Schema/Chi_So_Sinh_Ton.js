
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Chi_So_Sinh_Ton_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh : ObjectId,
    NhietDo : String,
    Mach : String,
    HuyetAp : String,
    NhipTho : String,
    ChieuCao : String,
    BMI : String,
    SP02 : String,
    CanNang : String
 
    
}, { collection: "Chi_So_Sinh_Ton" }); 
module.exports = mongoose.model("Chi_So_Sinh_Ton", Chi_So_Sinh_Ton_Schema);  
     