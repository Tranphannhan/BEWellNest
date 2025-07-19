const mongoose = require("mongoose");
// const uri = "mongodb://localhost:27017/WellNest";
const uri = "mongodb+srv://tranphannhan:oLVT47GDg2GMj9mb@cluster0.av1kh.mongodb.net/WellNest?retryWrites=true&w=majority"


async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Kết nối MongoDB thành công!");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
  }
}


module.exports = connectDB;
