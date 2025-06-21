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
    Gio:String,
    TrangThai: {
        type: String,
        enum: ['DangTao', 'DaXacNhan', 'DaPhatThuoc'], 
        required: true
    },
    
    
}, { collection: "Don_Thuoc" ,timestamps:true}); 
module.exports = mongoose.model("Don_Thuoc", Donthuoc_Schema);
