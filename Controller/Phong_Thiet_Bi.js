const Connect_Phong_Thiet_Bi = require("../Model/Phong_Thiet_Bi");
const Connect_Data_Model = new Connect_Phong_Thiet_Bi();

class Phong_Thiet_Bi_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" }); // ✅ đã sửa
  };

  Select_Phong_Thiet_Bi = (req, res, next) => {
    Connect_Data_Model.Select_Phong_Thiet_Bi_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length === 0) { // ✅ kiểm tra rỗng
        return res.status(404).json({ message: "Dữ liệu phòng thiết bị rỗng" }); // ✅ đã sửa
      }
      res.status(200).json(result);
    });
  };

  add_Phong_Thiet_Bi = (req, res, next) => {
    const data = {
      TenPhongThietBi: req.body.TenPhongThietBi?.trim(),
      TenXetNghiem: req.body.TenXetNghiem?.trim(),
      MoTaXetNghiem: req.body.MoTaXetNghiem?.trim()
    };

    if (!data.TenPhongThietBi || !data.TenXetNghiem || !data.MoTaXetNghiem) {
      return res.status(400).json({ message: "Thiếu dữ liệu để thêm phòng thiết bị" }); // ✅ đã thêm
    }

    Connect_Data_Model.Insert_Phong_Thiet_Bi_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm phòng thiết bị thất bại", error: err }); // ✅ đã sửa
      }
      res.status(201).json({ message: "Thêm phòng thiết bị thành công", data: result }); // ✅ đã sửa
    });
  };

  deletePhong_Thiet_Bi = (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID để xoá phòng thiết bị" }); // ✅ đã thêm
    }

    Connect_Data_Model.Delete_Phong_Thiet_Bi_M(id, (error, deletedPhong_Thiet_Bi) => {
      if (error) {
        return res.status(500).json({ message: "Lỗi khi xóa phòng thiết bị", error }); // ✅ đã sửa
      }

      if (!deletedPhong_Thiet_Bi) {
        return res.status(404).json({ message: "Không tìm thấy phòng thiết bị để xóa" }); // ✅ đã sửa
      }

      return res.status(200).json({
        message: "Xóa phòng thiết bị thành công",
        data: deletedPhong_Thiet_Bi // ✅ đổi tên field cho thống nhất
      });
    });
  };

  updatePhong_Thiet_Bi = (req, res) => {
    const { id } = req.params;
    const data = {
      TenPhongThietBi: req.body.TenPhongThietBi?.trim(),
      TenXetNghiem: req.body.TenXetNghiem?.trim(),
      MoTaXetNghiem: req.body.MoTaXetNghiem?.trim()
    };

    if (!id || !data.TenPhongThietBi || !data.TenXetNghiem || !data.MoTaXetNghiem) {
      return res.status(400).json({ message: "Thiếu dữ liệu để cập nhật phòng thiết bị" }); // ✅ đã thêm
    }

    Connect_Data_Model.Update_Phong_Thiet_Bi_M(id, data, (error, updatedPhong_Thiet_Bi) => {
      if (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật phòng thiết bị", error }); // ✅ đã sửa
      }

      if (!updatedPhong_Thiet_Bi) {
        return res.status(404).json({ message: "Không tìm thấy phòng thiết bị để cập nhật" }); // ✅ đã sửa
      }

      return res.status(200).json({
        message: "Cập nhật phòng thiết bị thành công",
        data: updatedPhong_Thiet_Bi // ✅ đổi tên field cho thống nhất
      });
    });
  };
}

module.exports = Phong_Thiet_Bi_Controler;
