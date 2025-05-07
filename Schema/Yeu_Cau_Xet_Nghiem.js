const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Yeu_Cau_Xet_Nghiem_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh : String,
    Id_PhongThietBi : ObjectId,
    TenXetNghiem : String,
    TrangThaiThanhToan : String,  
    Ngay : String,
    STT : String

}, { collection: "Yeu_Cau_Xet_Nghiem" }); 
module.exports = mongoose.model("Yeu_Cau_Xet_Nghiem", Yeu_Cau_Xet_Nghiem_Schema);