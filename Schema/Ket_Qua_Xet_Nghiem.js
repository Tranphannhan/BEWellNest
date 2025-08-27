const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const Ket_Qua_Xet_Nghiem_Schema = new mongoose.Schema({
  Id_YeuCauXetNghiem: { type: mongoose.Schema.Types.ObjectId, ref: 'Yeu_Cau_Xet_Nghiem', required: true },
  Id_PhieuKhamBenh: { type: mongoose.Schema.Types.ObjectId, ref: 'Phieu_Kham_Benh', required: true },
  Id_NguoiXetNghiem: { type: mongoose.Schema.Types.ObjectId, ref: 'Tai_Khoan', required: true },
  MaXetNghiem: { type: String },
  TenXetNghiem: { type: String },
  LoaiKetQua: { type: String, enum: ["DinhTinh", "DinhLuong", "HinhAnh", "MoTa"] },
  KetQua: { type: String },
  DonViTinh: { type: String },
  ChiSoBinhThuong: { type: String },
  GhiChu: { type: String },
  NgayXetNghiem: { type: String },
  Gio: { type: String },
  Image: { type: String },
  LoaiChup: { type: String }, // cho Imaging
  VungChup: { type: String }, // cho Imaging
  NguonThamChieu: { type: String }, // cho DinhLuong
  GioiHanCanhBao: { type: String }, // cho DinhLuong
}, { collection: "Ket_Qua_Xet_Nghiem" });


module.exports = mongoose.model("Ket_Qua_Xet_Nghiem", Ket_Qua_Xet_Nghiem_Schema);