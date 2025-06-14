const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
 
const Thuoc_Schema = new mongoose.Schema({
    Id_NhomThuoc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nhom_Thuoc', 
    },
    DonVi: String,
    TenThuoc:String,
    Gia : Number,   

}, { collection: "Thuoc" }); 
module.exports = mongoose.model("Thuoc", Thuoc_Schema);