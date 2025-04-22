const connectDB = require("../Model/Db");
const Donthuoc = require("../Schema/Don_Thuoc"); 

class Database_Donthuoc {
    Select_Donthuoc_M = async (Callback) => {
      try {
        await connectDB();
        const Select_Donthuoc = await Donthuoc.find({});
        Callback(null, Select_Donthuoc);
      } catch (error) {
        Callback(error);
      }
    };

    // Thêm đơn thuốc
    Insert_Donthuoc_M = async (data, Callback) => {
      try {
        await connectDB();
        const newDonthuoc = new Donthuoc(data);
        const saved = await newDonthuoc.save();
        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };

    // Cập nhật đơn thuốc
    Update_Donthuoc_M = async (id, updatedData, Callback) => {
      try {
        await connectDB();
        const updated = await Donthuoc.findByIdAndUpdate(id, updatedData, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };

    // Xóa đơn thuốc
    Delete_Donthuoc_M = async (id, Callback) => {
      try {
        await connectDB();
        const deleted = await Donthuoc.findByIdAndDelete(id);
        Callback(null, deleted);
      } catch (error) {
        Callback(error);
      }
    };
}

module.exports = Database_Donthuoc;
