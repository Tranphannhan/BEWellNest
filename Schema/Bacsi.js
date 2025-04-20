const mongoose = require("mongoose");

const BacSiSchema = new mongoose.Schema({
    TenBacSi: String,
    GioiTinh: String,
    SoDienThoai: String,
    ChuyenKhoa: String,
    HocVi: String,
    NamSinh: Number,
}, { collection: "Bac_Si" }); 

module.exports = mongoose.model("BacSi", BacSiSchema);
