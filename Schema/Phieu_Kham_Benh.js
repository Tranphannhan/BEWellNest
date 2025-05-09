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
    Ngay : String,  
    TrangThaiThanhToan : Boolean,
    STTKham : String,
    TrangThai: Boolean
    
}, { collection: "Phieu_Kham_Benh" }); 
module.exports = mongoose.model("Phieu_Kham_Benh", Phieu_Kham_Benh_Schema);