const mongoose = require("mongoose");
const Loai_Ca_Schema = new mongoose.Schema({
    TenLoaiCa : String,
    ThoiGianKetThuc : String,
    ThoiGianBatDau : String

}, { collection: "Loai_Ca" }); 
module.exports = mongoose.model("Loai_Ca", Loai_Ca_Schema);  