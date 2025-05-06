const Connect_Khoa = require("../Model/Khoa");
const Connect_Data_Model = new Connect_Khoa();

class Khoa_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Khoa = (req, res, next) => {
    Connect_Data_Model.Select_Khoa_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Khoa = (req, res, next) => {
    const data = {
      TenKhoa: req.body.TenKhoa?.trim()
    };
    Connect_Data_Model.Insert_Khoa_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm khoa thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm khoa thành công", data: result });
    });
  };

  deleteKhoa = (req, res) => {
    const { id } = req.params;
  
    Connect_Data_Model.Delete_Khoa_M(id, (error, deletedKhoa) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa khoa', error });
      }
  
      if (!deletedKhoa) {
        return res.status(404).json({ message: 'Không tìm thấy khoa để xóa' });
      }
  
      return res.status(200).json({
        message: 'Xóa khoa thành công',
        deletedKhoa
      });
    });
  };

  updateKhoa = (req, res) => {
    const { id } = req.params;
    const data = {
      TenKhoa: req.body.TenKhoa?.trim()
    };
  
    Connect_Data_Model.Update_Khoa_M(id, data, (error, updatedKhoa) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật khoa', error });
      }
  
      if (!updatedKhoa) {
        return res.status(404).json({ message: 'Không tìm thấy khoa để cập nhật' });
      }
  
      return res.status(200).json({
        message: 'Cập nhật khoa thành công',
        updatedKhoa
      });
    });
  };
}

module.exports = Khoa_Controler; 