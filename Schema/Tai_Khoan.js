const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Tai_Khoan_Schema = new mongoose.Schema({
    Id_LoaiTaiKhoan : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Loai_Tai_Khoan', 
        },
    TenTaiKhoan : String,
    MatKhau : String,
    SoDienThoai : String,
    SoCCCD: String,
    Image : String

}, { collection: "Tai_Khoan" }); 
module.exports = mongoose.model("Tai_Khoan", Tai_Khoan_Schema);    