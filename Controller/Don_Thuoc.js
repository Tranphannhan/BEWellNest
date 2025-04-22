const Connect_Donthuoc = require("../Model/Don_Thuoc");
const Connect_Data_Model = new Connect_Donthuoc();

class Donthuoc_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Donthuoc = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_M ((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Donthuoc = (req, res, next) => {
    const data = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh,
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan?.trim()
    };
    Connect_Data_Model.Insert_Donthuoc_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm đơn thuốc thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm đơn thuốc thành công", data: result });
    });
  };

  deleteDonthuoc = (req, res) => {
    const { id } = req.params;
  
    Connect_Data_Model.Delete_Donthuoc_M(id, (error, deletedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa đơn thuốc', error });
      }
  
      if (!deletedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để xóa' });
      }
  
      return res.status(200).json({
        message: 'Xóa đơn thuốc thành công',
        deletedDonthuoc
      });
    });
  };

  updateDonthuoc = (req, res) => {
    const { id } = req.params;
    const data = {
      Id_PhieuKhamBenh: req.body.Id_PhieuKhamBenh,
      TenDonThuoc: req.body.TenDonThuoc?.trim(),
      TrangThaiThanhToan: req.body.TrangThaiThanhToan?.trim()
    };
  
    Connect_Data_Model.Update_Donthuoc_M(id, data, (error, updatedDonthuoc) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật đơn thuốc', error });
      }
  
      if (!updatedDonthuoc) {
        return res.status(404).json({ message: 'Không tìm thấy đơn thuốc để cập nhật' });
      }
  
      return res.status(200).json({
        message: 'Cập nhật đơn thuốc thành công',
        updatedDonthuoc
      });
    });
  };
}

module.exports = Donthuoc_Controler;
