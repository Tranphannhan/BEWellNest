const Connect_Loai_Tai_Khoan = require("../Model/Loai_Tai_Khoan");
const Connect_Data_Model = new Connect_Loai_Tai_Khoan();

class Loai_Tai_Khoan {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Đã sửa thành chuẩn response JSON

  Select_Loai_Tai_Khoan = (req, res, next) => {
    Connect_Data_Model.Select_Loaitaikhoan_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu loại tài khoản rỗng" }); // ✅ Đã sửa thành response JSON
      }
      res.status(200).json(result);
    });
  };

  Add_Loai_Tai_Khoan = (req, res, next) => {
    const Data_Add = {
      TenLoaiTaiKhoan: req.body.TenLoaiTaiKhoan.trim(),
      VaiTro: req.body.VaiTro.trim()
    };

    if (!Data_Add.TenLoaiTaiKhoan) {
      return res.status(400).json({ message: "Không có dữ liệu loại tài khoản" }); // ✅ Đã sửa thành chuẩn response JSON
    }

    Connect_Data_Model.Add_Loaitaikhoan_M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm mới loại tài khoản thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };

  Edit_Loai_Tai_Khoan = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      TenLoaiTaiKhoan: req.body.TenLoaiTaiKhoan.trim(),
      VaiTro: req.body.VaiTro.trim()
    };

    if (!Data_Edit.TenLoaiTaiKhoan) {
      return res.status(400).json({ message: "Không có dữ liệu để cập nhật loại tài khoản" }); // ✅ Đã sửa thành chuẩn response JSON
    }

    Connect_Data_Model.Edit_Loaitaikhoan_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập nhật loại tài khoản thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };

  Delete_Loai_Tai_Khoan = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa loại tài khoản" }); // ✅ Đã sửa thành chuẩn response JSON

    Connect_Data_Model.Delete_Loaitaikhoan_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa loại tài khoản thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };
}

module.exports = Loai_Tai_Khoan;
