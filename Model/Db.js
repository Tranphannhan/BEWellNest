const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/WellNest";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
  }
}


module.exports = connectDB;
