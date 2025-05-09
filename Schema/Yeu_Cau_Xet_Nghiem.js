const mongoose = require("mongoose");

const Yeu_Cau_Xet_Nghiem_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phieu_Kham_Benh', 
    },

    Id_PhongThietBi : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phong_Thiet_Bi'
    },

    TrangThaiThanhToan : Boolean,  
    Ngay : String,
    STT : String,
    TrangThai: Boolean

}, { collection: "Yeu_Cau_Xet_Nghiem" }); 
module.exports = mongoose.model("Yeu_Cau_Xet_Nghiem", Yeu_Cau_Xet_Nghiem_Schema);