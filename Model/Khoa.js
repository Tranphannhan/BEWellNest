const connectDB = require("../Model/Db");
const Khoa = require("../Schema/Khoa"); 

class Database_Khoa {
    Select_Khoa_M = async (page ,  limit , Callback) => {
      try {
        const skip = (page - 1) * limit;
        await connectDB();
        const Select_Khoa = await Khoa.find({})
          .skip(skip)  
          .limit(limit);
            
        const total = await Khoa.countDocuments ();   
        Callback(null,  {totalItems:total, currentPage: page, totalPages: Math.ceil(total/limit),data:Select_Khoa});
      } catch (error) {
        Callback(error);
      }
    };

    

    // Thêm khoa
    Insert_Khoa_M = async (data, Callback) => {
      try {
        await connectDB();
        const newKhoa = new Khoa(data);
        const saved = await newKhoa.save();
        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };

    ChinhTrangThaiHoatDong__M =  async (_id , TrangThaiHoatDong , Callback) => {
      try {
        await connectDB();
        const updated = await Khoa.findByIdAndUpdate(_id, {TrangThaiHoatDong}, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };



    // Cập nhật khoa
    Update_Khoa_M = async (id, updatedData, Callback) => {
      try {
        await connectDB();
        const updated = await Khoa.findByIdAndUpdate(id, updatedData, { new: true });
        Callback(null, updated);
      } catch (error) {
        Callback(error);
      }
    };

    // Xóa khoa
    Delete_Khoa_M = async (id, Callback) => {
      try {
        await connectDB();
        const deleted = await Khoa.findByIdAndDelete(id);
        Callback(null, deleted);
      } catch (error) {
        Callback(error);
      }
    };
}

module.exports = Database_Khoa; 