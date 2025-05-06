const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Phong_Kham_Schema = new mongoose.Schema({
    Id_Khoa : ObjectId,
    SoPhongKham : String,

}, { collection: "Phong_Kham" }); 
module.exports = mongoose.model("Phong_Kham", Phong_Kham_Schema);