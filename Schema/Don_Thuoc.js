const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Donthuoc_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh: String,
    TenDonThuoc: String,
    TrangThaiThanhToan: String
    
    
}, { collection: "Don_Thuoc" }); 
module.exports = mongoose.model("Don_Thuoc", Donthuoc_Schema);
