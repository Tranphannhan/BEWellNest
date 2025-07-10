const Connect_Phong_Thiet_Bi = require("../Model/Phong_Thiet_Bi");
const Connect_Data_Model = new Connect_Phong_Thiet_Bi();

class Phong_Thiet_Bi_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" }); // ✅ đã sửa
  };

  Select_Phong_Thiet_Bi = (req, res, next) => {
    const limit = parseInt(req.query.limit) || 7;
    const page = parseInt(req.query.page) || 1;
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong || null;
    Connect_Data_Model.Select_Phong_Thiet_Bi_M(limit, page,TrangThaiHoatDong, (error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) {
        // ✅ kiểm tra rỗng
        return res.status(404).json({ message: "Dữ liệu phòng thiết bị rỗng" }); // ✅ đã sửa
      }
      res.status(200).json(result);
    });
  };

  getDetailPhong_Thiet_Bi = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Thiếu ID để lấy chi tiết phòng thiết bị" });
    }

    Connect_Data_Model.Get_Detail_Phong_Thiet_Bi_M(
      id,
      (error, phongThietBi) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Lỗi khi lấy chi tiết phòng thiết bị", error });
        }

        if (!phongThietBi) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy phòng thiết bị" });
        }

        return res.status(200).json({
          message: "Lấy chi tiết phòng thiết bị thành công",
          data: phongThietBi,
        });
      }
    );
  };

  add_Phong_Thiet_Bi = (req, res, next) => {
    const Image = req.file ? req.file.filename : false;
    if (!Image)
      return res.status(400).json({ message: "Upload ảnh lên thất bại" });
    const data = {
      TenPhongThietBi: req.body.TenPhongThietBi?.trim(),
      TenXetNghiem: req.body.TenXetNghiem?.trim(),
      Image: `${Image}`,
      TrangThaiHoatDong: true,
    };

    if (!data.TenPhongThietBi || !data.Image)
      return res
        .status(400)
        .json({ message: "Thiếu dữ liệu để thêm phòng thiết bị" });
    Connect_Data_Model.Insert_Phong_Thiet_Bi_M(data, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Thêm phòng thiết bị thất bại", error: err });
      res
        .status(201)
        .json({ message: "Thêm phòng thiết bị thành công", data: result });
    });
  };

  deletePhong_Thiet_Bi = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Thiếu ID để xoá phòng thiết bị" }); // ✅ đã thêm
    }

    Connect_Data_Model.Delete_Phong_Thiet_Bi_M(
      id,
      (error, deletedPhong_Thiet_Bi) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Lỗi khi xóa phòng thiết bị", error }); // ✅ đã sửa
        }

        if (!deletedPhong_Thiet_Bi) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy phòng thiết bị để xóa" }); // ✅ đã sửa
        }

        return res.status(200).json({
          message: "Xóa phòng thiết bị thành công",
          data: deletedPhong_Thiet_Bi, // ✅ đổi tên field cho thống nhất
        });
      }
    );
  };

updatePhong_Thiet_Bi = (req, res) => {
  const { id } = req.params;
  const Image = req.file ? req.file.filename : req.body.Image?.trim();

  const data = {
    TenPhongThietBi: req.body.TenPhongThietBi?.trim(),
    TenXetNghiem: req.body.TenXetNghiem?.trim(),
    ...(Image && { Image }), // Chỉ thêm Image nếu có giá trị hợp lệ
    TrangThaiHoatDong: req.body.TrangThaiHoatDong === "true" || req.body.TrangThaiHoatDong === true,
  };

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("data:", data);

  if (!id) {
    return res.status(400).json({ message: "Thiếu ID để cập nhật phòng thiết bị" });
  }

  if (!data.TenPhongThietBi || !data.TenXetNghiem || typeof data.TrangThaiHoatDong !== "boolean") {
    return res.status(400).json({
      message: "Thiếu hoặc sai dữ liệu để cập nhật phòng thiết bị",
      debug: data,
    });
  }

  Connect_Data_Model.Update_Phong_Thiet_Bi_M(id, data, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Cập nhật phòng thiết bị thất bại", error: err });
    }

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy phòng thiết bị để cập nhật" });
    }

    return res.status(200).json({
      message: "Cập nhật phòng thiết bị thành công",
      data: result,
    });
  });
};


}

module.exports = Phong_Thiet_Bi_Controler;
