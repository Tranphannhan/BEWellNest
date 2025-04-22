const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Ket_Qua_Xet_Nghiem_Schema = new mongoose.Schema({
    Id_YeuCauXetNghiem : String,
    Id_PhieuKhamBenh : String,
    TenXetNghiem : String,
    KetQua : String,  

}, { collection: "Ket_Qua_Xet_Nghiem" }); 
module.exports = mongoose.model("Ket_Qua_Xet_Nghiem", Ket_Qua_Xet_Nghiem_Schema);