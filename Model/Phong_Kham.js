const connectDB = require("../Model/Db");
const Phong_Kham = require("../Schema/Phong_Kham");

class Database_Phong_Kham {
  // Lấy danh sách phòng khám
  Select_Phong_Kham_M = async (limit, page, Callback) => {
    try {
      const skip = (page - 1) * limit;
      await connectDB();
      const Select_Phongkham = await Phong_Kham.find({})
        .populate({
          path: "Id_Khoa",
        })

        .skip(skip)
        .limit(limit);
      const total = await Phong_Kham.countDocuments();
      Callback(null, {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: Select_Phongkham,
      });
    } catch (error) {
      Callback(error);
    }
  };

  GetDetail_Phong_Kham_M = async (id, Callback) => {
    try {
      await connectDB();
      const phongKham = await Phong_Kham.findById(id).populate({
        path: "Id_Khoa",
      });
      Callback(null, phongKham);
    } catch (error) {
      Callback(error);
    }
  };

  Get_ByKhoa_M = async (Id_Khoa, Callback) => {
    try {
      await connectDB();
      const result = await Phong_Kham.find({ Id_Khoa: Id_Khoa }).populate({
        path: "Id_Khoa",
      });
      Callback(null, result);
    } catch (error) {
      Callback(error);
    }
  };

  // Thêm phòng khám
  Insert_Phong_Kham_M = async (data, Callback) => {
    try {
      await connectDB();
      const newPhong_Kham = new Phong_Kham(data);
      const saved = await newPhong_Kham.save();
      Callback(null, saved);
    } catch (error) {
      Callback(error);
    }
  };

  // Cập nhật phòng khám
  Update_Phong_Kham_M = async (id, updatedData, Callback) => {
    try {
      await connectDB();
      const updated = await Phong_Kham.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      Callback(null, updated);
    } catch (error) {
      Callback(error);
    }
  };

  // Xóa phòng khám
  Delete_Phong_Kham_M = async (id, Callback) => {
    try {
      await connectDB();
      const deleted = await Phong_Kham.findByIdAndDelete(id);
      Callback(null, deleted);
    } catch (error) {
      Callback(error);
    }
  };
}

module.exports = Database_Phong_Kham;
