const connectDB = require("../Model/Db");
const Donthuoc_Chitiet = require("../Schema/Don_Thuoc_Chi_Tiet"); 
const Thuoc = require("../Schema/Thuoc")

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

  Detail__M = async (Id_DonThuoc , Callback) => {
    try {
        await connectDB ();
        const Select_Detail = await Donthuoc_Chitiet.find ({Id_DonThuoc}).populate({
          path:"Id_Thuoc",
        });
        Callback(null, Select_Detail);
    } catch (error) {
        Callback(error);
    }   
  }




    Insert_Donthuoc_Chitiet_M = async (data, Callback) => {
      try {
        await connectDB();

        // Lấy thông tin thuốc từ DB
        const thuoc = await Thuoc.findById(data.Id_Thuoc);
        if (!thuoc) return Callback(new Error("Không tìm thấy thuốc"));

        // Kiểm tra số lượng tồn kho
        if (thuoc.SoLuong < data.SoLuong) {
          return Callback(`Số lượng thuốc hiện tại không đủ. Số lượng thuốc chỉ còn: ${thuoc.SoLuong}`);
        }

        // Trừ số lượng trong kho
        await Thuoc.findByIdAndUpdate(
          data.Id_Thuoc,
          { $inc: { SoLuong: -data.SoLuong } },
          { new: true }
        );

        // Lưu chi tiết đơn thuốc
        const newDonthuoc_Chitiet = new Donthuoc_Chitiet(data);
        const saved = await newDonthuoc_Chitiet.save();

        Callback(null, saved);
      } catch (error) {
        Callback(error);
      }
    };


  // Cập nhật chi tiết đơn thuốc
  Update_Donthuoc_Chitiet_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Donthuoc_Chitiet.findByIdAndUpdate(id, updatedData, { new: true });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  

  // Xóa chi tiết đơn thuốc
  Delete_Donthuoc_Chitiet_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Donthuoc_Chitiet.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Donthuoc_Chitiet;
