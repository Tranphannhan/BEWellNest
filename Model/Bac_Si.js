
const connectDB = require("../Model/Db");
const Bac_Si = require("../Schema/Bacsi"); 

class Database_Bacsi {
  // Lấy danh sách bác sĩ
  Select_Bacsi_M = async (Callback) => {
    try {
      await connectDB();
      const Select_Bacsi = await Bac_Si.find({});
      Callback(null, Select_Bacsi);
    } catch (error) {
      Callback(error);
    }
  };


  Select_Image_Bacsi_M = async (ID) => {
    await connectDB();
    const bacsi = await Bac_Si.findById(ID);
    return bacsi?.Image || null;
  };


  Check_Login__M = async (SDT_Login , Callback) => {
    try {
        await connectDB ();
        const Result_Request = await Bac_Si.findOne ({SoDienThoai : SDT_Login}).populate({
          path:"ID_Khoa",
        });
        Callback (null , Result_Request);
    } catch {
        Callback(error);
    }
  }



  // Thêm bác sĩ
  Insert_Bacsi_M = async (data, Callback) => {
    try {
      await connectDB();
      console.log(data)
      const newBacsi = new Bac_Si(data);
      const saved = await newBacsi.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật bác sĩ
  Update_Bacsi_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Bac_Si.findByIdAndUpdate (id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa bác sĩ
  Delete_Bacsi_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Bac_Si.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}


module.exports = Database_Bacsi;
