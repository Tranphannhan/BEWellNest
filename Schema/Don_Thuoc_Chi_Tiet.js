const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Donthuoc_Chitiet_Schema = new mongoose.Schema({
    Id_DonThuoc: ObjectId,
    Id_Thuoc: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thuoc', 
            },
    SoLuong:Number,
    NhacNho:String
    
}, { collection: "Don_Thuoc_Chi_Tiet" }); 
module.exports = mongoose.model("Don_Thuoc_Chi_Tiet", Donthuoc_Chitiet_Schema);
