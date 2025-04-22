const Connect_Donthuoc_Chitiet  = require("../Model/Don_Thuoc_Chi_Tiet");
const Connect_Data_Model = new Connect_Donthuoc_Chitiet();

class Donthuoc_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };
  
  Select_Donthuoc_Chitiet = (req, res, next) => {
    Connect_Data_Model.Select_Donthuoc_Chitiet_M ((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Donthuoc_Chitiet = (req, res, next) => {
    const data = {
      Id_DonThuoc: req.body.Id_DonThuoc,
      TenThuoc: req.body.TenThuoc?.trim(),
      CachDung: req.body.CachDung?.trim(),
      LieuDung: req.body.LieuDung?.trim(),
      SoNgayDungThuoc: req.body.SoNgayDungThuoc
    };
    Connect_Data_Model.Insert_Donthuoc_Chitiet_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm chi tiết đơn thuốc thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm chi tiết đơn thuốc thành công", data: result });
    });
  };

  deleteDonthuoc_Chitiet = (req, res) => {
    const { id } = req.params;
  
    Connect_Data_Model.Delete_Donthuoc_Chitiet_M(id, (error, deletedDonthuoc_Chitiet) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa chi tiết đơn thuốc', error });
      }
  
      if (!deletedDonthuoc_Chitiet) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn thuốc để xóa' });
      }
  
      return res.status(200).json({
        message: 'Xóa chi tiết đơn thuốc thành công',
        deletedDonthuoc_Chitiet
      });
    });
  };

  updateDonthuoc_Chitiet = (req, res) => {
    const { id } = req.params;
    const data = {
      Id_DonThuoc: req.body.Id_DonThuoc,
      TenThuoc: req.body.TenThuoc?.trim(),
      CachDung: req.body.CachDung?.trim(),
      LieuDung: req.body.LieuDung?.trim(),
      SoNgayDungThuoc: req.body.SoNgayDungThuoc
    };
  
    Connect_Data_Model.Update_Donthuoc_Chitiet_M(id, data, (error, updatedDonthuoc_Chitiet) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật chi tiết đơn thuốc', error });
      }
  
      if (!updatedDonthuoc_Chitiet) {
        return res.status(404).json({ message: 'Không tìm thấy chi tiết đơn thuốc để cập nhật' });
      }
  
      return res.status(200).json({
        message: 'Cập nhật chi tiết đơn thuốc thành công',
        updatedDonthuoc_Chitiet
      });
    });
  };
}

module.exports = Donthuoc_Controler;
