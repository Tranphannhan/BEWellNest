const mongoose = require("mongoose");
 
const Thuoc_Schema = new mongoose.Schema({
    ChonPhong:{
        type: String,
        enum: ['ThuCong', 'ItNguoi', 'PhongGan','PhongXa','GanDay'], 
        required: true
    },
    ThoiGianKham:Number,
    ApDungThoiGianKham:Boolean,
    GioiHangBenhNhan:Number
}, { collection: "Chuc_Nang_He_Thong" }); 
module.exports = mongoose.model("Chuc_Nang_He_Thong", Thuoc_Schema);