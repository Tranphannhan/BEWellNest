const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Thuoc_Schema = new mongoose.Schema({
    Id_NhomThuoc:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Nhom_Thuoc', 
            },
    
    Id_NhaSanXuat:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Nha_San_Xuat', 
            },

    TenThuoc:String,
    MoTa : String,
    ThanhPhan : String,  
    CachDung : String,
    NgaySanXuat : String,
    HanSuDung : String,
    NgayNhapKho : String,
    DonVi : String,
    GiaMoiDonVi : Number,
    LoThuoc : String,
    SoLuong : Number,
    URLAnhThuoc: String

}, { collection: "Thuoc" }); 
module.exports = mongoose.model("Thuoc", Thuoc_Schema);