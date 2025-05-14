const mongoose = require("mongoose");
const Nha_San_Xuat_Schema = new mongoose.Schema({
    Ten : String,
    DiaChi : String,
    SoDienThoai : String

}, { collection: "Nha_San_Xuat" }); 
module.exports = mongoose.model("Nha_San_Xuat", Nha_San_Xuat_Schema);  