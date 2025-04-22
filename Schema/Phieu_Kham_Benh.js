const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Phieu_Kham_Benh_Schema = new mongoose.Schema({
    Id_TheKhamBenh : ObjectId,
    Id_CaKham : ObjectId,
    SoPhongKham : String,
    Ngay : String,  
    TrangThaiThanhToan : String,
    TenCa : String,
    TenBacSi : String,
    SoPhong : String,
    STTKham : String   
    
}, { collection: "Phieu_Kham_Benh" }); 
module.exports = mongoose.model("Phieu_Kham_Benh", Phieu_Kham_Benh_Schema);