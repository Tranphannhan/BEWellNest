const connectDB = require("../Model/Db");
const Phong_Thiet_Bi = require("../Schema/Phong_Thiet_Bi"); 

class Database_Phong_Thiet_Bi {
    Select_Phong_Thiet_Bi_M = async (Callback) => {
      try {
        await connectDB();
        const Select_Phong_Thiet_Bi = await Phong_Thiet_Bi.find({});
        Callback(null, Select_Phong_Thiet_Bi);
      } catch (error) {
        Callback(error);
      }
    };

    // Thêm phòng thiết bị
    Insert_Phong_Thiet_Bi_M = async (data, Callback) => {
      try {
        await connectDB();
        const newPhong_Thiet_Bi = new Phong_Thiet_Bi(data);
        const saved = await newPhong_Thiet_Bi.save();
        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };

    // Cập nhật phòng thiết bị
    Update_Phong_Thiet_Bi_M = async (id, updatedData, Callback) => {
      try {
        await connectDB();
        const updated = await Phong_Thiet_Bi.findByIdAndUpdate(id, updatedData, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };

    // Xóa phòng thiết bị
    Delete_Phong_Thiet_Bi_M = async (id, Callback) => {
      try {
        await connectDB();
        const deleted = await Phong_Thiet_Bi.findByIdAndDelete(id);
        Callback(null, deleted);
      } catch (error) {
        Callback(error);
      }
    };
}

module.exports = Database_Phong_Thiet_Bi; 