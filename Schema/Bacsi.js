const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const BacSiSchema = new mongoose.Schema({
    ID_Khoa : ObjectId,
    TenBacSi: String,
    GioiTinh: String,
    SoDienThoai: String,
    HocVi: String,
    NamSinh: Number,
    Matkhau : String,
    Image : String ,
    VaiTro : String,
    TrangThaiHoatDong : Boolean

}, { collection: "Bac_Si" }); 

module.exports = mongoose.model("BacSi", BacSiSchema);
