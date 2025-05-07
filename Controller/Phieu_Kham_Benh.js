const Connect_Phieu_Kham_Benh = require("../Model/Phieu_Kham_Benh");
const Connect_Data_Model = new Connect_Phieu_Kham_Benh();

class Phieu_Kham_Benh {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Đã sửa thành chuẩn response JSON

  Select_Phieukhambenh = (req, res, next) => {
    Connect_Data_Model.Select_Phieukhambenh_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu phiếu khám bệnh rỗng" }); // ✅ Đã sửa thành response JSON
      }
      res.status(200).json(result);
    });
  };

  Add_Phieukhambenh = (req, res, next) => {
    const ngay = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại dạng YYYY-MM-DD

    // Lấy số thứ tự tiếp theo
    Connect_Data_Model.GetNextSTT_M(ngay, req.body.Id_CaKham.trim(), (error, nextSTT) => {
      if (error) return next(error);

      const Data_Add = {
        Id_TheKhamBenh: req.body.Id_TheKhamBenh.trim(),
        Id_CaKham: req.body.Id_CaKham.trim(),
        SoPhongKham: req.body.SoPhongKham.trim(),
        Ngay: ngay,
        TrangThaiThanhToan: false,
        TenCa: req.body.TenCa.trim(),
        TenBacSi: req.body.TenBacSi.trim(),
        // Số thức tự mới tạo là 0 vì thanh toán xong thì mới xếp số thứ tự
        STTKham: 0
      };

      if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu để thêm phiếu khám bệnh" }); // ✅ Đã sửa thành chuẩn response JSON
      Connect_Data_Model.Add_Phieukhambenh_M(Data_Add, (Error, Result) => {
        if (Error) return next(Error);
        res.status(201).json({ message: "Thêm mới phiếu khám bệnh thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
      });
    });
  };

  Edit_Phieukhambenh = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      SoPhongKham: req.body.SoPhongKham.trim(),
      Ngay: new Date(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan.trim(),
      TenCa: req.body.TenCa.trim(),
      TenBacSi: req.body.TenBacSi.trim(),
      STTKham: req.body.STTKham.trim()
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu để cập nhật phiếu khám bệnh" }); // ✅ Đã sửa thành chuẩn response JSON
    Connect_Data_Model.Edit_Phieukhambenh_M(ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập nhật phiếu khám bệnh thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };

  Delete_Phieukham = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để xóa phiếu khám bệnh" }); // ✅ Đã sửa thành chuẩn response JSON
    Connect_Data_Model.Delete_Phieukhambenh_M(ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa phiếu khám bệnh thành công", data: Result }); // ✅ Đã sửa thành chuẩn response JSON
    });
  };
}

module.exports = Phieu_Kham_Benh;
