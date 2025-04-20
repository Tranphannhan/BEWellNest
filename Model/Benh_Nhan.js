
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
  
}

module.exports = Database_Benhnhan;
