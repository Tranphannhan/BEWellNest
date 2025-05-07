const Connect_Kham_Lam_Sang = require("../Model/Kham_Lam_Sang");
const Connect_Data_Model = new Connect_Kham_Lam_Sang();

class Kham_Lam_Sang {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Kham_Lam_Sang = (req, res, next) => {
    Connect_Data_Model.Select_Phieukhambenh_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu Kham_Lam_Sang rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  };

  Add_Kham_Lam_Sang = (req, res, next) => {
    const Data_Add = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      TrieuChung: req.body.TrieuChung.trim(),
      KetQua: req.body.KetQua.trim(),
    };

    if (!Data_Add.Id_PhieuKhamBenh || !Data_Add.TrieuChung || !Data_Add.KetQua) { // ✅ Kiểm tra dữ liệu hợp lệ
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Add_Kham_Lam_Sang_M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Mới Kham_Lam_Sang Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };

  Edit_Kham_Lam_Sang = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      TrieuChung: req.body.TrieuChung.trim(),
      KetQua: req.body.KetQua.trim(),
    };

    if (!Data_Edit.Id_PhieuKhamBenh || !Data_Edit.TrieuChung || !Data_Edit.KetQua) { // ✅ Kiểm tra dữ liệu hợp lệ
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Edit_Kham_Lam_Sang_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Kham_Lam_Sang Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };

  Delete_Kham_Lam_Sang = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa Kham_Lam_Sang" }); // ✅ Kiểm tra ID

    Connect_Data_Model.Delete_Kham_Lam_Sang_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      if (!Result) {
        return res.status(404).json({ message: "Không tìm thấy Kham_Lam_Sang để xóa" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json({ message: "Xóa Kham_Lam_Sang Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };
}

module.exports = Kham_Lam_Sang;
