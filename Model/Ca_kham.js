const { path } = require("../app");
const connectDB = require("../Model/Db");
const Cakham = require("../Schema/Cakham"); 
const Phieukhambenh = require ('../Schema/Phieu_Kham_Benh');

class Database_Cakham {
    Select_Cakham_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Cakham = await Cakham.find({}).populate({
        path:'Id_BacSi',
        select: 'TenBacSi'
      }).populate({
         path:'Id_PhongKham',
        select: 'SoPhongKham',
        populate:{
          path: 'Id_Khoa',
          select: 'TenKhoa'
        }
      });
      Callback(null, Select_Cakham);
    } catch (error) {
      Callback(error);
    }
  };


  
  Get_Count_Cakham__M = async (ID_Cakham, Date, Callback) => {
    try {
      await connectDB();
      const count = await Phieukhambenh.countDocuments({
        Id_CaKham: ID_Cakham,
        Ngay: Date,
        TrangThaiThanhToan: true,
        TrangThai: false,
      });  
    
      Callback(null, count);
    } catch (error) {
      Callback(error);
    }
  };


  // Thêm ca khám
  Insert_Cakham_M = async (data, Callback) => {
    try {
      await connectDB();
      const newCakham = new Cakham(data);
      const saved = await newCakham.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật ca khám
  Update_Cakham_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Cakham.findByIdAndUpdate(id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa ca khám
  Delete_Cakham_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Cakham.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Cakham;
