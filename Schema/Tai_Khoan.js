const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Tai_Khoan_Schema = new mongoose.Schema({
    Id_LoaiTaiKhoan : ObjectId,
    TenTaiKhoan : String,
    MatKhau : String,
    TenDangNhap : String,  
    TenLoaiTaiKhoan : String,
    Image : String

}, { collection: "Tai_Khoan" }); 
module.exports = mongoose.model("Tai_Khoan", Tai_Khoan_Schema);    