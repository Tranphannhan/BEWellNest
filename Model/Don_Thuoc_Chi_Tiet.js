
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
}

module.exports = Database_Donthuoc_Chitiet;
