const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Ket_Qua_Xet_Nghiem_Schema = new mongoose.Schema({
    Id_YeuCauXetNghiem : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Yeu_Cau_Xet_Nghiem', 
        },

    Id_PhieuKhamBenh: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Phieu_Kham_Benh', 
        },

    Id_NguoiXetNghiem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tai_Khoan',
        },
        
    KetQua : String,  
    Anh_Xet_Nghiem : String

}, { collection: "Ket_Qua_Xet_Nghiem" }); 
module.exports = mongoose.model("Ket_Qua_Xet_Nghiem", Ket_Qua_Xet_Nghiem_Schema);