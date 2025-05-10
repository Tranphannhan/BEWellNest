const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Phong_Kham_Schema = new mongoose.Schema({
    Id_Khoa : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Khoa', 
                },
    
    SoPhongKham : String,

}, { collection: "Phong_Kham" }); 
module.exports = mongoose.model("Phong_Kham", Phong_Kham_Schema);