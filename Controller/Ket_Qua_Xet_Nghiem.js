const Connect_Select_Ketquaxetnghiem = require("../Model/Ket_Qua_Xet_Nghiem");
const Connect_Data_Model = new Connect_Select_Ketquaxetnghiem();

class Ketquaxetnghiem_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Ketquaxetnghiem = (req, res, next) => {
    Connect_Data_Model.Select_Ketquaxetnghiem_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu Kết Quả Xét Nghiệm rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  };

  Add_Ketquaxetnghiem = (req, res, next) => {
    const Data_Add = {
      Id_YeuCauXetNghiem: req.body.Id_YeuCauXetNghiem.trim(),
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      TenXetNghiem: req.body.TenXetNghiem.trim(),
      KetQua: req.body.KetQua.trim(),
    };

    if (!Data_Add.Id_YeuCauXetNghiem || !Data_Add.Id_PhieuKhamBenh || !Data_Add.TenXetNghiem || !Data_Add.KetQua) { // ✅ Kiểm tra dữ liệu hợp lệ
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Add_Ketquaxetnghiem_M(Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Mới Kết Quả Xét Nghiệm Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };

  Edit_Ketquaxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      Id_YeuCauXetNghiem: req.body.Id_YeuCauXetNghiem.trim(),
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh.trim(),
      TenXetNghiem: req.body.TenXetNghiem.trim(),
      KetQua: req.body.KetQua.trim(),
    };

    if (!Data_Edit.Id_YeuCauXetNghiem || !Data_Edit.Id_PhieuKhamBenh || !Data_Edit.TenXetNghiem || !Data_Edit.KetQua) { // ✅ Kiểm tra dữ liệu hợp lệ
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Chuẩn hóa response
    }

    Connect_Data_Model.Edit_Ketquaxetnghiem_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Kết Quả Yêu Cầu Xét Nghiệm Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };

  Delete_Ketquaxetnghiem = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa Kết Quả Xét Nghiệm" }); // ✅ Kiểm tra ID

    Connect_Data_Model.Delete_Ketquaxetnghiem_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      if (!Result) {
        return res.status(404).json({ message: "Không tìm thấy Kết Quả Xét Nghiệm để xóa" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json({ message: "Xóa Kết Quả Yêu Cầu Xét Nghiệm Thành Công", data: Result }); // ✅ Chuẩn hóa response
    });
  };
}

module.exports = Ketquaxetnghiem_Controler;
