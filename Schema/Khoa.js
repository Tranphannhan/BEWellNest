const mongoose = require("mongoose");


const Khoa_Schema = new mongoose.Schema({
    TenKhoa: String,
    
    
}, { collection: "Khoa" }); 
module.exports = mongoose.model("Khoa", Khoa_Schema);
