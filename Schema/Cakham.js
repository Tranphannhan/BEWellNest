const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Cakham_Schema = new mongoose.Schema({
    Id_BacSi: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BacSi', 
            },

    Id_PhongKham: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Phong_Kham', 
            },
    TenCa: String,
}, { collection: "Ca_Kham" }); 
module.exports = mongoose.model("Ca_Kham", Cakham_Schema);
