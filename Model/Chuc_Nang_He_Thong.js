
const connectDB = require("../Model/Db");
const ChucNangHeThong = require("../Schema/Chuc_Nang_He_Thong"); 
   
class Database_Thuoc {
    GetChucNang__M = async (Callback) => {
        try {
            await connectDB();
            const Select_Thuoc = await ChucNangHeThong.findOne({});
            Callback(null, Select_Thuoc);
        } catch (error) {
            Callback(error);
        }   
    };
    
    UpdateChucNang__M = async (id, dataUpdate, Callback) => {
    try {
      await connectDB();
      const Updated = await ChucNangHeThong.findByIdAndUpdate(id, dataUpdate, { new: true });
      Callback(null, Updated);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Thuoc;
