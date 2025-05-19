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
    };

    if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Add_Nhom_NhomThuoc__M (Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Nhóm Thuốc Thành Công" });
    });
  };



  Edit_Nhomthuoc = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
      TenNhomThuoc: req.body.TenNhomThuoc.trim(),
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


}

module.exports = Thuoc_Controler;
