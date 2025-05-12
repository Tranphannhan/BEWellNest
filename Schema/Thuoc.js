const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Thuoc_Schema = new mongoose.Schema({
    TenThuoc : String,
    MoTa : String,
    ThanhPhan : String,  
    DangBaoChe  : String ,
    CachDung : String,
    ChiDinhSuDung : String,
    ChongChiDinh : String,
    TacDungPhu : String,  
    NhaSanXuat  : String ,
    NhomThuoc : String,
    NgaySanXuat : String,
    HanSuDung : String,
    NgayNhapKho : String,
    DonVi : String,
    GiaMoiDonVi : Number,
    LoThuoc : String,
    SoLuong : Number

}, { collection: "Thuoc" }); 
module.exports = mongoose.model("Thuoc", Thuoc_Schema);