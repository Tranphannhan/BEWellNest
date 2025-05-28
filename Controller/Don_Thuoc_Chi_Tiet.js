const Connect_Donthuoc_Chitiet = require("../Model/Don_Thuoc_Chi_Tiet");
const Connect_Data_Model = new Connect_Donthuoc_Chitiet();

class Donthuoc_Chitiet_Controler {
  Runviews = (req, res, next) => res.status(200).json({ message: "Loadding Thành Công" }); // ✅ Chuẩn hóa phản hồi

  Select_Donthuoc_Chitiet = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_Chitiet_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { // ✅ Kiểm tra dữ liệu rỗng
        return res.status(404).json({ message: "Dữ liệu Chi Tiết Đơn Thuốc rỗng" }); // ✅ Chuẩn hóa response
      }
      res.status(200).json(result);
    });
  };

  Detail_Donthuoc = (req, res, next) => {
    const ID  =  req.params.ID;
    Connect_Data_Model.Detail__M (ID  , (error , result) => {
    if (error) return next(error);
      res.status(200).json(result);
    });
  }
    



  add_Donthuoc_Chitiet = (req, res, next) => {
    const data = {
      Id_DonThuoc: req.body.Id_DonThuoc,
      Id_Thuoc: req.body.Id_Thuoc,
      SoLuong: req.body.SoLuong?.trim(),
      NhacNho: req.body.NhacNho?.trim(),
    };

    // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_DonThuoc || !data.Id_Thuoc || !data.SoLuong || !data.NhacNho) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }

    Connect_Data_Model.Insert_Donthuoc_Chitiet_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm chi tiết đơn thuốc thất bại", error: err });
      }
      res.status(201).json({ message: "Thêm chi tiết đơn thuốc thành công", data: result }); // ✅ Chuẩn hóa response
    });
  };

  deleteDonthuoc_Chitiet = (req, res, next) => {
    const { id } = req.params;

    // ✅ Kiểm tra ID hợp lệ
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa chi tiết đơn thuốc" }); // ✅ Kiểm tra ID hợp lệ

    Connect_Data_Model.Delete_Donthuoc_Chitiet_M(id, (error, deletedDonthuoc_Chitiet) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa chi tiết đơn thuốc', error });
      }

      if (!deletedDonthuoc_Chitiet) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn thuốc để xóa' }); // ✅ Chuẩn hóa response
      }

      return res.status(200).json({
        message: 'Xóa chi tiết đơn thuốc thành công',
        deletedDonthuoc_Chitiet
      });
    });
  };

  updateDonthuoc_Chitiet = (req, res, next) => {
    const { id } = req.params;
    const data = {
      SoLuong: req.body.SoLuong?.trim(),
      NhacNho: req.body.NhacNho?.trim(),
    };

      // ✅ Kiểm tra dữ liệu hợp lệ
    if (!data.Id_DonThuoc || !data.Id_Thuoc || !data.SoLuong || !data.DonVi || !data.NhacNho) {
      return res.status(400).json({ message: "Thiếu dữ liệu cần thiết" }); // ✅ Kiểm tra dữ liệu hợp lệ
    }

    Connect_Data_Model.Update_Donthuoc_Chitiet_M(id, data, (error, updatedDonthuoc_Chitiet) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật chi tiết đơn thuốc', error });
      }

      if (!updatedDonthuoc_Chitiet) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn thuốc để cập nhật' }); // ✅ Chuẩn hóa response
      }

      return res.status(200).json({
        message: 'Cập nhật chi tiết đơn thuốc thành công',
        updatedDonthuoc_Chitiet
      });
    });
  };
}

module.exports = Donthuoc_Chitiet_Controler;
