
const connectDB = require("../Model/Db");
const Cakham = require("../Schema/Cakham"); 

class Database_Cakham {
    Select_Cakham_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Cakham = await Cakham.find({});
      Callback(null, Select_Cakham);
    } catch (error) {
      Callback(error);
    }

  };
}

module.exports = Database_Cakham;
