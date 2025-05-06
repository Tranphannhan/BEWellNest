const Connect_Phong_Thiet_Bi = require("../Model/Phong_Thiet_Bi");
const Connect_Data_Model = new Connect_Phong_Thiet_Bi();

class Phong_Thiet_Bi_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Phong_Thiet_Bi = (req, res, next) => {
    Connect_Data_Model.Select_Phong_Thiet_Bi_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Phong_Thiet_Bi = (req, res, next) => {
    const data = {
      TenPhongThietBi: req.body.TenPhongThietBi?.trim(),
      TenXetNghiem: req.body.TenXetNghiem?.trim(),
      MoTaXetNghiem: req.body.MoTaXetNghiem?.trim()
    };
    Connect_Data_Model.Insert_Phong_Thiet_Bi_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm phòng thiết bị thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm phòng thiết bị thành công", data: result });
    });
  };

  deletePhong_Thiet_Bi = (req, res) => {
    const { id } = req.params;
  
    Connect_Data_Model.Delete_Phong_Thiet_Bi_M(id, (error, deletedPhong_Thiet_Bi) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa phòng thiết bị', error });
      }
  
      if (!deletedPhong_Thiet_Bi) {
        return res.status(404).json({ message: 'Không tìm thấy phòng thiết bị để xóa' });
      }
  
      return res.status(200).json({
        message: 'Xóa phòng thiết bị thành công',
        deletedPhong_Thiet_Bi
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
  
    Connect_Data_Model.Update_Phong_Thiet_Bi_M(id, data, (error, updatedPhong_Thiet_Bi) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật phòng thiết bị', error });
      }
  
      if (!updatedPhong_Thiet_Bi) {
        return res.status(404).json({ message: 'Không tìm thấy phòng thiết bị để cập nhật' });
      }
  
      return res.status(200).json({
        message: 'Cập nhật phòng thiết bị thành công',
        updatedPhong_Thiet_Bi
      });
    });
  };
}

module.exports = Phong_Thiet_Bi_Controler; 