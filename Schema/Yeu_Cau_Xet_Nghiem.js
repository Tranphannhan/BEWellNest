const mongoose = require("mongoose");

const Yeu_Cau_Xet_Nghiem_Schema = new mongoose.Schema({
    Id_PhieuKhamBenh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phieu_Kham_Benh', 
    },

    Id_PhongThietBi : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phong_Thiet_Bi'
    },

    TrangThaiThanhToan : Boolean,  
    Ngay : String,   
    STT : String,
    // Trang thái đã xét nghiệm hay chưa (Không được sửa)
    TrangThai: Boolean,
    TrangThaiHoatDong : Boolean

    // Thêm TrangThaiHoatDong kiểu: Boolen Mặc định là true
    // Thêm chức năng boqua

}, { collection: "Yeu_Cau_Xet_Nghiem" }); 
module.exports = mongoose.model("Yeu_Cau_Xet_Nghiem", Yeu_Cau_Xet_Nghiem_Schema);