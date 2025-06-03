
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Chi_Tiet_Kham_Lam_Sang_Schema = new mongoose.Schema({
    Id_KhamLamSang : ObjectId,
    TrieuChung : String,
    ChuanDoanSoBo : String
    
}, { collection: "Chi_Tiet_Kham_Lam_Sang" }); 
module.exports = mongoose.model("Chi_Tiet_Kham_Lam_Sang", Chi_Tiet_Kham_Lam_Sang_Schema);  
     