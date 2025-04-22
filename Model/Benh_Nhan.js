const connectDB = require("../Model/Db");
const Benhnhan = require("../Schema/Benhnhan"); 

class Database_Benhnhan {
    Select_Benhnhan_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Bacsi = await Benhnhan.find({});
      Callback(null, Select_Bacsi);
    } catch (error) {
      Callback(error);
    }
  };

  // Thêm bệnh nhân
  Insert_Benhnhan_M = async (data, Callback) => {
    try {
      await connectDB();
      const newBenhnhan = new Benhnhan(data);
      const saved = await newBenhnhan.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật bệnh nhân
  Update_Benhnhan_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Benhnhan.findByIdAndUpdate(id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa bệnh nhân
  Delete_Benhnhan_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Benhnhan.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Benhnhan;
