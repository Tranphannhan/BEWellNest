const Connect_Bacsi_M = require("../Model/Bac_Si");
const Connect_Data_Model = new Connect_Bacsi_M();

class Bacsi_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loading Thành Công" }); // ✅ Chuẩn hóa phản hồi
  };

  Select_Bacsi = (req, res, next) => {
    Connect_Data_Model.Select_Bacsi_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); // ✅ Chuẩn hóa phản hồi
      }
      res.status(200).json(result);
    });
  };

  add_Bacsi = (req, res, next) => {
    const data = {
      TenBacSi: req.body.TenBacSi?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      ChuyenKhoa: req.body.ChuyenKhoa?.trim(),
      HocVi: req.body.HocVi?.trim(),
      NamSinh: req.body['NamSinh']?.trim() ? Number(req.body['NamSinh'].trim()) : null
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.TenBacSi || !data.GioiTinh || !data.SoDienThoai || !data.ChuyenKhoa || !data.HocVi || data.NamSinh === null) {
      return res.status(400).json({ message: "Thiếu thông tin bác sĩ, vui lòng kiểm tra lại" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }

    Connect_Data_Model.Insert_Bacsi_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm bác sĩ thất bại", error: err });
      }
      res.status(201).json({ message: "Thêm bác sĩ thành công", data: result }); // ✅ Trả về status 201 cho tạo mới
    });
  };

  deleteBacSi = (req, res, next) => {
    const { id } = req.params;

    // ✅ Kiểm tra ID hợp lệ
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa bác sĩ" }); // ✅ Kiểm tra ID hợp lệ

    Connect_Data_Model.Delete_Bacsi_M(id, (error, deletedBacSi) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa bác sĩ', error });
      }

      if (!deletedBacSi) {
        return res.status(404).json({ message: 'Không tìm thấy bác sĩ để xóa' }); // ✅ Chuẩn hóa phản hồi
      }

      return res.status(200).json({
        message: 'Xóa bác sĩ thành công',
        deletedBacSi
      });
    });
  };

  updateBacSi = (req, res, next) => {
    const { id } = req.params;
    const data = {
      TenBacSi: req.body.TenBacSi?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      ChuyenKhoa: req.body.ChuyenKhoa?.trim(),
      HocVi: req.body.HocVi?.trim(),
      NamSinh: req.body['NamSinh']?.trim() ? Number(req.body['NamSinh'].trim()) : null
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.TenBacSi || !data.GioiTinh || !data.SoDienThoai || !data.ChuyenKhoa || !data.HocVi || data.NamSinh === null) {
      return res.status(400).json({ message: "Thiếu thông tin bác sĩ, vui lòng kiểm tra lại" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }

    Connect_Data_Model.Update_Bacsi_M(id, data, (error, updatedBacSi) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật bác sĩ', error });
      }

      if (!updatedBacSi) {
        return res.status(404).json({ message: 'Không tìm thấy bác sĩ để cập nhật' }); // ✅ Chuẩn hóa phản hồi
      }

      return res.status(200).json({
        message: 'Cập nhật bác sĩ thành công',
        updatedBacSi
      });
    });
  };
}

module.exports = Bacsi_Controler;
