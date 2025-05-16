const Connect_Bacsi_M = require("../Model/Bac_Si");
const Connect_Data_Model = new Connect_Bacsi_M();
const Handle_Password = require('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password();


class Bacsi_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loading Thành Công" }); 
  };


  Select_Bacsi = (req, res, next) => {
    Connect_Data_Model.Select_Bacsi_M((error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); 
      }
      res.status(200).json(result);
    });
  };
    
            
  add_Bacsi = async (req, res, next) => {
    const Image = req.file ?  `http://localhost:5000/image/${req.file.filename}`  : 'http://localhost:5000/image/bacsi.jpg';
    const Matkhau_Mahoa = await Connect_Handle_Password.hashPassword(req.body.Matkhau);

    const data = {
      ID_Khoa : req.body.ID_Khoa?.trim(),
      TenBacSi: req.body.TenBacSi?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      HocVi: req.body.HocVi?.trim(),
      NamSinh: req.body['NamSinh']?.trim() ? Number(req.body['NamSinh'].trim()) : null,
      Matkhau : Matkhau_Mahoa,
      Image : Image,
      VaiTro : 'BacSi',
      TrangThaiHoatDong : true
    };

    Connect_Data_Model.Insert_Bacsi_M(data, (err, result) => {
      if (err) return res.status(500).json({ message: "Thêm bác sĩ thất bại", error: err });
      res.status(201).json({ message: "Thêm bác sĩ thành công", data: result }); 
    });
  };


 
  updateBacSi = async (req, res, next) => {
    try {
      const Image = req.file ?  `http://localhost:5000/image/${req.file.filename}` : null;
      const Matkhau_Mahoa = await Connect_Handle_Password.hashPassword(req.body.Matkhau);
      const { id } = req.params;
 
      let data = {
        ID_Khoa : req.body.ID_Khoa?.trim(),
        TenBacSi: req.body.TenBacSi?.trim(),
        GioiTinh: req.body.GioiTinh?.trim(),
        SoDienThoai: req.body.SoDienThoai?.trim(),
        HocVi: req.body.HocVi?.trim(),
        NamSinh: req.body['NamSinh']?.trim() ? Number(req.body['NamSinh'].trim()) : null,
        Matkhau : Matkhau_Mahoa,
        Image : Image,
        VaiTro : 'BacSi',
        TrangThaiHoatDong : true
      };

      if (!Image) {
        delete data.Image;
      }

      Connect_Data_Model.Update_Bacsi_M(id, data, (error, updatedBacSi) => {
        if (error) return res.status(500).json({ message: 'Lỗi khi cập nhật bác sĩ', error });
        if (!updatedBacSi) return res.status(404).json({ message: 'Không tìm thấy bác sĩ để cập nhật' });
        return res.status(200).json({
          message: 'Cập nhật bác sĩ thành công',
          updatedBacSi
        });
      });

    } catch (err) {
      res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  };



















  deleteBacSi = (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID để xóa bác sĩ" }); 
    Connect_Data_Model.Delete_Bacsi_M(id, (error, deletedBacSi) => {
      if (error) return res.status(500).json({ message: 'Lỗi khi xóa bác sĩ', error });
      if (!deletedBacSi) return res.status(404).json({ message: 'Không tìm thấy bác sĩ để xóa' }); 
      return res.status(200).json({
        message: 'Xóa bác sĩ thành công',
        deletedBacSi
      });
    });
  };


  
 



}

module.exports = Bacsi_Controler;
