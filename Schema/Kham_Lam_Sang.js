const { text } = require("express");
const mongoose = require("mongoose");


const Kham_Lam_Sang_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Phieu_Kham_Benh', 
            },  
    
    TrangThaiHoanThanh : Boolean,
    GhiChu : String,
    HuongSuLy : String,
    KetQua : String
    
}, { collection: "Kham_Lam_Sang" }); 
module.exports = mongoose.model("Kham_Lam_Sang", Kham_Lam_Sang_Schema);  
     