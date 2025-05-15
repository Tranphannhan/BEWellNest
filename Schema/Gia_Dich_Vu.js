const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Giadichvu_Schema = new mongoose.Schema({
    Tendichvu : String,
    Giadichvu : Number
}, { collection: "Gia_Dich_Vu" }); 
module.exports = mongoose.model("Gia_Dich_Vu", Giadichvu_Schema);  