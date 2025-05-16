const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Donthuoc_Schema = new mongoose.Schema({
     Id_PhieuKhamBenh: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Phieu_Kham_Benh', 
        },

    Id_NguoiPhatThuoc: {
                type: mongoose.Schema.Types.ObjectId || null,
                ref: 'Tai_Khoan',
            },

    TenDonThuoc: String,
    TrangThaiThanhToan: Boolean,
    TrangThai: Boolean
    
    
}, { collection: "Don_Thuoc" }); 
module.exports = mongoose.model("Don_Thuoc", Donthuoc_Schema);
