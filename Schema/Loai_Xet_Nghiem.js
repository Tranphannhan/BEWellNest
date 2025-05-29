const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Loai_Xet_Nghiem_Schema = new mongoose.Schema ({
    Id_PhongThietBi : ObjectId,
    Id_GiaDichVu : ObjectId,
    TenXetNghiem : String,
    MoTaXetNghiem : String,
    Image : String,
    TrangThaiHoatDong : Boolean

}, { collection: "Loai_Xet_Nghiem" }); 
module.exports = mongoose.model("Loai_Xet_Nghiem", Loai_Xet_Nghiem_Schema);  
