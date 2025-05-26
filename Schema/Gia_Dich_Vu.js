const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Giadichvu_Schema = new mongoose.Schema ({
    Tendichvu : String,
    Giadichvu : Number ,
    //  : 
    Loaigia : {
        type: String,
        enum: ['GiaKham' , 'GiaXetNghiem'], 
        required: true
    },
    TrangThaiHoatDong : Boolean

}, { collection: "Gia_Dich_Vu" }); 
module.exports = mongoose.model("Gia_Dich_Vu", Giadichvu_Schema);  
