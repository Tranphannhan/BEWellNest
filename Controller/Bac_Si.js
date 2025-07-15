const Connect_Bacsi_M = require("../Model/Bac_Si");
const Connect_Data_Model = new Connect_Bacsi_M();
const Handle_Password = require('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password();
const bcrypt = require('bcrypt');


class Bacsi_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loading Thành Công" }); 
  };

  Select_Bacsi = (req, res, next) => {
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    Connect_Data_Model.Select_Bacsi_M(page,limit,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); 
      }
      res.status(200).json(result);
    });
  };


  Search = (req, res, next) => {
    const TenBacSi = req.query.Key;
    const limit = parseInt(req.query.limit)|| 7;
    const page = parseInt(req.query.page)|| 1;

    if (!TenBacSi) return res.status(400).json({ message: "Thiếu key tìm kiếm" });
    Connect_Data_Model.Search__M ( page,limit,TenBacSi , (error, result) => {
      if (error) return next(error);
      if (!result) return res.status(404).json([]);
      return res.status(200).json(result);
    });
  };


  Get_ByTrangThaiHoatDong = (req, res, next) => {
    const TrangThaiHoatDong = req.query.TrangThaiHoatDong;
    if(!TrangThaiHoatDong) return res.status(500).json({ message: "Vui lòng cho trạng thái hoạt động vào" }); 
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    Connect_Data_Model.Get_ByTrangThaiHoatDong_M(page,limit,TrangThaiHoatDong,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); 
      }
      res.status(200).json(result);
    });
  };


  Get_Dettail = (req, res, next) => {
    const id = req.params.ID;
    Connect_Data_Model.Get_Dettail_M(id,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); 
      }
      res.status(200).json(result);
    });
  };


  Get_ByKhoa = (req, res, next) => {
    const id = req.params.ID;
    const limit = parseInt(req.query.limit)||7;
    const page = parseInt(req.query.page)||1;
    Connect_Data_Model.Get_ByKhoa_M(page,limit,id,(error, result) => {
      if (error) return next(error);
      if (!result || result.length < 1) { 
        return res.status(404).json({ message: "Không có bác sĩ nào trong hệ thống" }); 
      }
      res.status(200).json(result);
    });
  };
     
            
  add_Bacsi = async (req, res, next) => {
    const Image = req.file ?  `${req.file.filename}`  : 'bacsi.jpg';
    const Matkhau_Mahoa = await Connect_Handle_Password.hashPassword(req.body.Matkhau);

    const data = {
      ID_Khoa : req.body.ID_Khoa?.trim(),
      Id_PhongKham  : req.body.Id_PhongKham?.trim(),
      TenBacSi: req.body.TenBacSi?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      HocVi: req.body.HocVi?.trim(),
      NamSinh: req.body['NamSinh']?.trim() ? Number(req.body['NamSinh'].trim()) : null,
      SoCCCD: req.body.SoCCCD?.trim(),
      Matkhau : Matkhau_Mahoa,
      Image : Image, 
      VaiTro : 'BacSi',
      TrangThaiHoatDong : true
    };

    const Continue = await Connect_Data_Model.Check_SoDienThoai_register(data.SoDienThoai)
    if(Continue === false) return res.status(500).json({message:"Số điện thoại này đã được đăng ký rồi"})
    Connect_Data_Model.Insert_Bacsi_M(data, (err, result) => {
      if (err) return res.status(500).json({ message: "Thêm bác sĩ thất bại", error: err });
      res.status(201).json({ message: "Thêm bác sĩ thành công", data: result }); 
    });
  };



  Check_Login = async (req , res , next) => {
    const Password_Login  = req.body.MatKhau?.trim();
    const SDT_Login  = req.body.SoDienThoai?.trim();
    if (!Password_Login || !SDT_Login) return res.status(400).json ({message : "Đăng nhập thất bại"});

    Connect_Data_Model.Check_Login__M  (SDT_Login , async (error , result) => {
      if (error) return next (error);
      if (!result) return res.status(404).json ({message : "Số điện thoại không chính xác"});
      const isMatch = await bcrypt.compare(Password_Login, result.Matkhau);
      if (!isMatch) return  res.status (401).json ({message : 'Mật khẩu không chính xác' , Data_Token_ : false });
      if (result.TrangThaiHoatDong === false) return  res.status(403).json ({message : "Tài khoản đã ngừng hoạt động"});

      const Data_Token_ = {
        _id : result._id,
        _ID_Khoa : result.ID_Khoa,
        _Id_PhongKham : result.Id_PhongKham,
        _TenBacSi :  result.TenBacSi,
        _GioiTinh : result.GioiTinh,
        _SoDienThoai : result.SoDienThoai,
        _HocVi : result.HocVi,
        _NamSinh : result.NamSinh,
        _VaiTro: result.VaiTro,
        _Image : result.Image,
        _TrangThaiHoatDong : result.TrangThaiHoatDong
      }   

      const jwt = require('jsonwebtoken');
      const secretKey = 'WellNest_User';
      const token = jwt.sign(Data_Token_, secretKey, { expiresIn: '1h' });
      res.status (200).json ({
          Data_Token_  : token,
          message : 'Đăng Nhập Tài Khoản Thành Công'
      });
    });
  }




 
  updateBacSi = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Xử lý ảnh nếu có upload
    const Image = req.file
      ? `${req.file.filename}`
      : null;

    // Chỉ hash mật khẩu nếu có gửi lên
    let Matkhau_Mahoa = null;
    if (req.body.Matkhau && req.body.Matkhau.trim() !== "") {
      Matkhau_Mahoa = await Connect_Handle_Password.hashPassword(req.body.Matkhau);
    }

    const data = {
      ID_Khoa: req.body.ID_Khoa?.trim(),
      Id_PhongKham: req.body.Id_PhongKham?.trim(),
      TenBacSi: req.body.TenBacSi?.trim(),
      GioiTinh: req.body.GioiTinh?.trim(),
      SoDienThoai: req.body.SoDienThoai?.trim(),
      HocVi: req.body.HocVi?.trim(),
      NamSinh: req.body.NamSinh?.trim(),
      SoCCCD: req.body.SoCCCD?.trim(),
      VaiTro: "BacSi",
      TrangThaiHoatDong: req.body.TrangThaiHoatDong,
    };

    if (Image) data.Image = Image;
    if (Matkhau_Mahoa) data.Matkhau = Matkhau_Mahoa;

    // Cập nhật vào DB
    Connect_Data_Model.Update_Bacsi_M(id, data, (error, updatedBacSi) => {
      if (error) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật bác sĩ",
          error,
        });
      }

      if (!updatedBacSi) {
        return res.status(404).json({
          message: "Không tìm thấy bác sĩ để cập nhật",
        });
      }

      return res.status(200).json({
        message: "Cập nhật bác sĩ thành công",
        updatedBacSi,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: "Lỗi server",
      error: err.message,
    });
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
