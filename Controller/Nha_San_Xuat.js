const Connect_Select_Nhasanxuat = require("../Model/Nha_San_Xuat");
const Connect_Data_Model = new Connect_Select_Nhasanxuat();

class Nhasanxuat_Controler {
  Runviews = (req, res, next) => {
    res.status(200).json({ message: "Loadding Thành Công" });
  };  

     
  Select_Nhasanxuat = (req, res, next) => {
    Connect_Data_Model.Select_Nhasanxuat__M ((error, result) => {
        if (error) return next(error);
        if (result.length < 1) return res.status(404).json({ message: "Dữ liệu Nhà Sản Xuất Rỗng" });
        res.status(200).json(result);
    });
  };


  Add_Nhasanxuat = (req, res, next) => {
    const Data_Add = {
        Ten: req.body.Ten.trim(),
        DiaChi: req.body.DiaChi.trim(),
        SoDienThoai: req.body.SoDienThoai.trim()
    };


    if (!Data_Add) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Add_Nhasanxuat__M (Data_Add, (Error, Result) => {
      if (Error) return next(Error);
      res.status(201).json({ message: "Thêm Nhà Sản Xuất Thành Công" });
    });
  };

  
  Edit_Nhasanxuat = (req, res, next) => {
    const { ID } = req.params;
    const Data_Edit = {
        Ten: req.body.Ten.trim(),
        DiaChi: req.body.DiaChi.trim(),
        SoDienThoai: req.body.SoDienThoai
    };

    if (!Data_Edit) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Edit_Nhasanxuat__M (ID, Data_Edit, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Cập Nhật Nhà Sản Xuất Thành Công" });
    });
  };


  Delete_Nhasanxuat = (req, res, next) => {
    const { ID } = req.params;
    if (!ID) return res.status(400).json({ message: "Không có dữ liệu" });
    Connect_Data_Model.Delete_Nhasanxuat__M (ID, (Error, Result) => {
      if (Error) return next(Error);
      res.status(200).json({ message: "Xóa Nhà Sản Xuất Thành Công" });
    });
  };


}

module.exports = Nhasanxuat_Controler;
