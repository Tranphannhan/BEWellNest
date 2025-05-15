const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Thuoc_Schema = new mongoose.Schema({
    Id_NhomThuoc:ObjectId,
    Id_NhaSanXuat:ObjectId,
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