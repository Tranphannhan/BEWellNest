const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const The_Kham_Benh_Schema = new mongoose.Schema({
    Id_BenhNhan : String,
    HoVaTen : String,
    GioiTinh : String,
    NgaySinh : String,  
    SoDienThoai : String,
    SoBaoHiemYTe : String,
    DiaChi : String

}, { collection: "The_Kham_Benh" }); 
module.exports = mongoose.model("The_Kham_Benh", The_Kham_Benh_Schema);