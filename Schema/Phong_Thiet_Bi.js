const mongoose = require("mongoose");

const Phong_Thiet_Bi_Schema = new mongoose.Schema({
    TenPhongThietBi: String,
    TenXetNghiem: String,
    MoTaXetNghiem: String
}, { collection: "Phong_Thiet_Bi" }); 

module.exports = mongoose.model("Phong_Thiet_Bi", Phong_Thiet_Bi_Schema);
