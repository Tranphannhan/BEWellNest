const mongoose = require("mongoose");

const BenhnhanSchema = new mongoose.Schema({
    HoVaTen: String,
    GioiTinh: String,
    NgaySinh: String,
    DiaChi: String,
    SoDienThoai: String,
    SoBaoHiemYTe: String,
    SDT_NguoiThan: String
    
}, { collection: "Benh_Nhan" }); 
module.exports = mongoose.model("Benh_Nhan", BenhnhanSchema);
