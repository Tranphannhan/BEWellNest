const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const HoadonnSchema = new mongoose.Schema({
    Id_PhieuKhamBenh : ObjectId,
    Id_Dichvu: ObjectId,
    Id_ThuNgan: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tai_Khoan',
            },
    TenHoaDon: String,
    TongTien: Number

}, { collection: "Hoa_Don" }); 

module.exports = mongoose.model("Hoa_Don", HoadonnSchema);