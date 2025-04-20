
const connectDB = require("../Model/Db");
const Bac_Si = require("../Schema/Bacsi"); 

class Database_Bacsi{
  Select_Bacsi_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({});
      Callback(null, Select_Bacsi);
    } catch (error) {
      Callback(error);
    }
  };

  


}

module.exports = Database_Bacsi;
