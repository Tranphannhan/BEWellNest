
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
}

module.exports = Database_Donthuoc;
