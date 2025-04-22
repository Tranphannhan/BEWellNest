const connectDB = require("../Model/Db");
const Donthuoc_Chitiet = require("../Schema/Don_Thuoc_Chi_Tiet"); 

class Database_Donthuoc_Chitiet {
    Select_Donthuoc_Chitiet_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Donthuoc_Chitiet  = await Donthuoc_Chitiet.find({});
      Callback(null, Select_Donthuoc_Chitiet);
    } catch (error) {
      Callback(error);
    }
  
  };

  // Thêm chi tiết đơn thuốc
  Insert_Donthuoc_Chitiet_M = async (data, Callback) => {
    try {
      await connectDB();
      const newDonthuoc_Chitiet = new Donthuoc_Chitiet(data);
      const saved = await newDonthuoc_Chitiet.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật chi tiết đơn thuốc
  Update_Donthuoc_Chitiet_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Donthuoc_Chitiet.findByIdAndUpdate(id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa chi tiết đơn thuốc
  Delete_Donthuoc_Chitiet_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Donthuoc_Chitiet.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Donthuoc_Chitiet;
