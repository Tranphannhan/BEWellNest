const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Phieu_Kham_Benh_Schema = new mongoose.Schema({
    Id_TheKhamBenh :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'The_Kham_Benh', 
        },

    Id_CaKham : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ca_Kham',
        },

    Id_NguoiTiepNhan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tai_Khoan',
        },  
    Id_GiaDichVu:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gia_Dich_Vu',
    },
    Ngay : String,  
    TrangThaiThanhToan : Boolean,
    STTKham : String,  
    TrangThai: Boolean,

    TrangThaiHoatDong: {
        type: String,  
        enum: ['Kham', 'XetNghiem', 'BoQua'], 
        required: true
    },

}, { collection: "Phieu_Kham_Benh" }); 
module.exports = mongoose.model("Phieu_Kham_Benh", Phieu_Kham_Benh_Schema);