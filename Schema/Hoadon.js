const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const HoadonnSchema = new mongoose.Schema({
    Id_PhieuKhamBenh : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Phieu_Kham_Benh', 
            },
    Id_Dichvu: ObjectId || null,
    Id_ThuNgan: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tai_Khoan',
            },
    LoaiHoaDon: {
        type: String,
        enum: ['Kham', 'Thuoc', 'XetNghiem'], 
        required: true
    },
    TenHoaDon: String,

}, { collection: "Hoa_Don" }); 

module.exports = mongoose.model("Hoa_Don", HoadonnSchema);