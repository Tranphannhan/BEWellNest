const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Phieu_Kham_Benh_Schema = new mongoose.Schema({
    Id_TheKhamBenh :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'The_Kham_Benh', 
        },
  
    Id_Bacsi : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BacSi',
        },

    Id_NguoiTiepNhan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tai_Khoan',
        },  
    Id_GiaDichVu:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gia_Dich_Vu',
    },

    
    LyDoDenKham : String,
    Ngay : String,  
    Gio:String,
    TrangThaiThanhToan : Boolean,
    STTKham : Number,  
    TrangThai: Boolean,

    TrangThaiHoatDong: {
        type: String,  
        enum: ['Kham', 'XetNghiem', 'BoQua'], 
        required: true
    },
    GioKetThucKham:String,
    SoLanKhongCoMat:Number,

}, { collection: "Phieu_Kham_Benh" }); 
module.exports = mongoose.model("Phieu_Kham_Benh", Phieu_Kham_Benh_Schema);