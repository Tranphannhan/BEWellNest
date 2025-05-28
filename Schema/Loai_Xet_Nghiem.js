const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Loai_Xet_Nghiem_Schema = new mongoose.Schema ({
    Id_PhongThietBi : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Phong_Thiet_Bi'
        },
    
    Id_GiaDichVu :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gia_Dich_Vu'
        },
    TenXetNghiem : String,
    MoTaXetNghiem : String,
    Image : String

}, { collection: "Loai_Xet_Nghiem" }); 
module.exports = mongoose.model("Loai_Xet_Nghiem", Loai_Xet_Nghiem_Schema);  
