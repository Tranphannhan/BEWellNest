const Connect_Phong_Kham = require("../Model/Phong_Kham");
const Connect_Data_Model = new Connect_Phong_Kham();

class Phong_Kham_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Phong_Kham = (req, res, next) => {
    Connect_Data_Model.Select_Phong_Kham_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Phong_Kham = (req, res, next) => {
    const data = {
      Id_Khoa: req.body.Id_Khoa,
      SoPhongKham: req.body.SoPhongKham?.trim()
    };
    Connect_Data_Model.Insert_Phong_Kham_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm phòng khám thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm phòng khám thành công", data: result });
    });
  };

  deletePhong_Kham = (req, res) => {
    const { id } = req.params;
    Connect_Data_Model.Delete_Phong_Kham_M(id, (error, deletedPhong_Kham) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa phòng khám', error });
      }
      if (!deletedPhong_Kham) {
        return res.status(404).json({ message: 'Không tìm thấy phòng khám để xóa' });
      }
      return res.status(200).json({
        message: 'Xóa phòng khám thành công',
        deletedPhong_Kham
      });
    });
  };

  updatePhong_Kham = (req, res) => {
    const { id } = req.params;
    const data = {
      Id_Khoa: req.body.Id_Khoa,
      SoPhongKham: req.body.SoPhongKham?.trim()
    };
    Connect_Data_Model.Update_Phong_Kham_M(id, data, (error, updatedPhong_Kham) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật phòng khám', error });
      }
      if (!updatedPhong_Kham) {
        return res.status(404).json({ message: 'Không tìm thấy phòng khám để cập nhật' });
      }
      return res.status(200).json({
        message: 'Cập nhật phòng khám thành công',
        updatedPhong_Kham
      });
    });
  };
}

module.exports = Phong_Kham_Controler; 