const connectDB = require("../Model/Db");
const Loaica = require("../Schema/Loaica"); 

class Database_Loaica {
    Select_LoaiCa__M = async ( Callback) => {
      try {
        await connectDB();
        const Select_Loaica = await Loaica.find({}); 
        Callback(null, Select_Loaica);
      } catch (error) {
        Callback(error);
      }
    };


    // Thêm Loaica
    Insert_Loaica_M = async (data, Callback) => {
      try {
        await connectDB();
        const newLoaica = new Loaica(data);
        const saved = await newLoaica.save();
        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };

    
    // Cập nhật Loaica
    Update_Loaica_M = async (id, updatedData, Callback) => {
      try {
        await connectDB();
        const updated = await Loaica.findByIdAndUpdate(id, updatedData, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };

    

    Delete_Loaica_M = async (id, Callback) => {
      try {
        await connectDB();
        const deleted = await Loaica.findByIdAndDelete(id);
        Callback(null, deleted);
      } catch (error) {
        Callback(error);
      }
    };
}

module.exports = Database_Loaica; 