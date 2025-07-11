const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Loai_Tai_Khoan_Schema = new mongoose.Schema({
    TenLoaiTaiKhoan : String,
    VaiTro: {
        type: String,
        enum: ['ThuNgan', 'TiepNhan', 'QuanLyKhoThuoc', 'Admin', 'BacSiXetNghiem','DuocSi'], 
        required: true
    }   


}, { collection: "Loai_Tai_Khoan" }); 
module.exports = mongoose.model("Loai_Tai_Khoan", Loai_Tai_Khoan_Schema);