const Connect_Benhnhan_M = require("../Model/Benh_Nhan");
const Connect_Data_Model = new Connect_Benhnhan_M();

class Benhnhan_Controler {
  Runviews = (req, res, next) => {
    res.send("Loadding Thành Công");
  };

  Select_Benhnhan = (req, res, next) => {
    Connect_Data_Model.Select_Benhnhan_M((error, result) => {
      if (error) return next(error);
      res.status(200).json(result);
    });
  };

  add_Benhnhan = (req, res, next) => {
    const data = {
      HoVaTen: req.body.HoVaTen?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      NgaySinh: req.body.NgaySinh?.trim(),
      DiaChi: req.body.DiaChi?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      SoBaoHiemYTe: req.body.SoBaoHiemYTe?.trim(),
      SDT_NguoiThan: req.body.SDT_NguoiThan?.trim()
    };
    Connect_Data_Model.Insert_Benhnhan_M(data, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Thêm bệnh nhân thất bại", error: err });
      }
      res.status(200).json({ message: "Thêm bệnh nhân thành công", data: result });
    });
  };

  deleteBenhnhan = (req, res) => {
    const { id } = req.params;
  
    Connect_Data_Model.Delete_Benhnhan_M(id, (error, deletedBenhnhan) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi xóa bệnh nhân', error });
      }
  
      if (!deletedBenhnhan) {
        return res.status(404).json({ message: 'Không tìm thấy bệnh nhân để xóa' });
      }
  
      return res.status(200).json({
        message: 'Xóa bệnh nhân thành công',
        deletedBenhnhan
      });
    });
  };

  updateBenhnhan = (req, res) => {
    const { id } = req.params;
    const data = {
      HoVaTen: req.body.HoVaTen?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      NgaySinh: req.body.NgaySinh?.trim(),
      DiaChi: req.body.DiaChi?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      SoBaoHiemYTe: req.body.SoBaoHiemYTe?.trim(),
      SDT_NguoiThan: req.body.SDT_NguoiThan?.trim()
    };
  
    Connect_Data_Model.Update_Benhnhan_M(id, data, (error, updatedBenhnhan) => {
      if (error) {
        return res.status(500).json({ message: 'Lỗi khi cập nhật bệnh nhân', error });
      }
  
      if (!updatedBenhnhan) {
        return res.status(404).json({ message: 'Không tìm thấy bệnh nhân để cập nhật' });
      }
  
      return res.status(200).json({
        message: 'Cập nhật bệnh nhân thành công',
        updatedBenhnhan
      });
    });
  };
}

module.exports = Benhnhan_Controler;
