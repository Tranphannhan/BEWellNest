const mongoose = require("mongoose");
const Nhom_Thuoc_Schema = new mongoose.Schema({
    TenNhomThuoc : String,
}, { collection: "Nhom_Thuoc" }); 
module.exports = mongoose.model("Nhom_Thuoc", Nhom_Thuoc_Schema);