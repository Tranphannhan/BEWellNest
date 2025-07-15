const Connect_Select_Nhomthuoc = require("../Model/Nhom_Thuoc");
const Connect_Data_Model = new Connect_Select_Nhomthuoc();

class Thuoc_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };  
   

  Select_Nhomthuoc = (req, res, next) => {
    const limit = parseInt (req.query.limit) || 7;
    const page = parseInt (req.query.page) || 1;

    Connect_Data_Model.Select_Nhom_Thuoc__M (limit , page , (error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Nhóm Thuốc Rỗng" });
      res.status(200).json(result);
    });
  };


  Add_Nhomthuoc = (req, res, next) => {
    const Data_Add = {
      TenNhomThuoc: req.body.TenNhomThuoc.trim(),
      TrangThaiHoatDong : true
    };

    if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Add_Nhom_NhomThuoc__M (Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Nhóm Thuốc Thành Công" });
    });
  };

  Detail_Nhomthuoc = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Thiếu ID để lấy chi tiết" });

    Connect_Data_Model.Detail_NhomNhomThuoc__M(ID, (error, result) => {
        if (error) return next(error);
        if (!result) return res.status(404).json({ message: "Không tìm thấy Nhóm Thuốc" });
        res.status(200).json(result);
    });
};


  
  Edit_Nhomthuoc = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      TenNhomThuoc: req.body.TenNhomThuoc.trim(),
      TrangThaiHoatDong : req.body.TrangThaiHoatDong,
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Edit_NhomNhomThuoc__M (ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Nhóm Thuốc Thành Công" });
    });
  };


  Delete_Nhomthuoc = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Delete_NhomNhomThuoc__M (ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa Nhóm Thuốc Thành Công" });
    });
  };

  TimKiemNhomThuoc = (req, res, next) => {
    const TenNhomThuoc = req.query.TenNhomThuoc || null;
    Connect_Data_Model.TimKiemNhomThuoc__M  (TenNhomThuoc ,(error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.status(404).json({ message: "Không tìm thấy nhóm thuốc nào" });
      res.status(200).json(result);
    });
  };  

  
}

module.exports = Thuoc_Controler;
