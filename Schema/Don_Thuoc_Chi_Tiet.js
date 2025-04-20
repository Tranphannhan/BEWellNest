const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Donthuoc_Chitiet_Schema = new mongoose.Schema({
    Id_DonThuoc: ObjectId,
    TenThuoc: String,
    CachDung: String,
    LieuDung : String,
    SoNgayDungThuoc : Number
    
}, { collection: "Don_Thuoc_Chi_Tiet" }); 
module.exports = mongoose.model("Don_Thuoc_Chi_Tiet", Donthuoc_Chitiet_Schema);
