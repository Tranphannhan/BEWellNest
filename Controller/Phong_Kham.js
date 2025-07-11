const Connect_Phong_Kham = require("../Model/Phong_Kham");
const Connect_Data_Model = new Connect_Phong_Kham();

class Phong_Kham_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" }); // ✅ đã sửa
  };

  Select_Phong_Kham = (req, res, next) => {
    const limit = parseInt(req.query.limit) || 7;
    const page = parseInt(req.query.page) || 1;

    Connect_Data_Model.Select_Phong_Kham_M(limit, page, (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
        // ✅ kiểm tra rỗng
        return res.status(404).json({ message: "Dữ liệu phòng khám rỗng" }); // ✅ đã sửa
      }
      res.status(200).json(result);
    });
  };

  getDetailPhong_Kham = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Thiếu ID để lấy chi tiết phòng khám" });
    }

    Connect_Data_Model.GetDetail_Phong_Kham_M(id, (error, phongKham) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Lỗi khi lấy chi tiết phòng khám", error });
      }

      if (!phongKham) {
        return res.status(404).json({ message: "Không tìm thấy phòng khám" });
      }

      return res.status(200).json({
        message: "Lấy chi tiết phòng khám thành công",
        data: phongKham,
      });
    });
  };

  Get_ByKhoa = (req, res, next) => {
    const Id_Khoa = req.params.ID;
    Connect_Data_Model.Get_ByKhoa_M(Id_Khoa, (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
        // ✅ kiểm tra rỗng
        return res.status(404).json({ message: "Dữ liệu phòng khám rỗng" }); // ✅ đã sửa
      }
      res.status(200).json(result);
    });
  };

    Get_ByKhoa_Empty = (req, res, next) => {
    const Id_Khoa = req.params.ID;
    Connect_Data_Model.Get_ByKhoa_Empty_M(Id_Khoa, (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
        // ✅ kiểm tra rỗng
        return res.status(404).json({ message: "Dữ liệu phòng khám rỗng" }); // ✅ đã sửa
      }
      res.status(200).json(result);
    });
  };


  add_Phong_Kham = (req, res, next) => {
    const data = {
      Id_Khoa: req.body.Id_Khoa,
      SoPhongKham: req.body.SoPhongKham?.trim(),
      TrangThaiHoatDong: true,
    };

    if (!data.Id_Khoa || !data.SoPhongKham) {
      return res
        .status(400)
        .json({ message: "Thiếu dữ liệu để thêm phòng khám" }); // ✅ đã thêm
    }

    Connect_Data_Model.Insert_Phong_Kham_M(data, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Thêm phòng khám thất bại", error: err }); // ✅ đã sửa
      }
      res
        .status(201)
        .json({ message: "Thêm phòng khám thành công", data: result }); // ✅ đã sửa
    });
  };

  deletePhong_Kham = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID để xoá phòng khám" }); // ✅ đã thêm
    }

    Connect_Data_Model.Delete_Phong_Kham_M(id, (error, deletedPhong_Kham) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Lỗi khi xóa phòng khám", error }); // ✅ đã sửa
      }

      if (!deletedPhong_Kham) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy phòng khám để xóa" }); // ✅ đã sửa
      }

      return res.status(200).json({
        message: "Xóa phòng khám thành công",
        data: deletedPhong_Kham, // ✅ đổi tên field cho thống nhất
      });
    });
  };

  updatePhong_Kham = (req, res) => {
  const { id } = req.params;
  const data = {
    Id_Khoa: req.body.Id_Khoa,
    SoPhongKham: req.body.SoPhongKham?.trim(),
    TrangThaiHoatDong: req.body.TrangThaiHoatDong, // Thêm TrangThaiHoatDong
  };

  // Kiểm tra dữ liệu đầu vào
  if (!id || !data.Id_Khoa || !data.SoPhongKham || data.TrangThaiHoatDong === undefined) {
    return res.status(400).json({ message: "Thiếu dữ liệu để cập nhật phòng khám" });
  }

  Connect_Data_Model.Update_Phong_Kham_M(id, data, (error, updatedPhong_Kham) => {
    if (error) {
      return res.status(500).json({ message: "Lỗi khi cập nhật phòng khám", error });
    }

    if (!updatedPhong_Kham) {
      return res.status(404).json({ message: "Không tìm thấy phòng khám để cập nhật" });
    }

    return res.status(200).json({
      message: "Cập nhật phòng khám thành công",
      data: updatedPhong_Kham,
    });
  });
};
}

module.exports = Phong_Kham_Controler;
