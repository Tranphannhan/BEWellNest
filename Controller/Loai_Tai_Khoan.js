const Connect_Loai_Tai_Khoan = require("../Model/Loai_Tai_Khoan");
const Connect_Data_Model = new Connect_Loai_Tai_Khoan();

  
class Loai_Tai_Khoan {
  Runviews = (req, res, next) => res.send("Loadding Thành Công")

  Select_Loai_Tai_Khoan = (req, res, next) => {
    Connect_Data_Model.Select_Loaitaikhoan_M ((error, result) => {
      if (error) return next(error);
      if (result.length < 1) return res.send ("Dữ liệu Loại Tài Khoản Rỗng");
      res.status(200).json(result);
    });
  };


  Add_Loai_Tai_Khoan = (req , res , next) => {
    const Data_Add = {
        TenLoaiTaiKhoan : req.body.TenLoaiTaiKhoan.trim(),
    }

    if (!Data_Add) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Add_Loaitaikhoan_M (Data_Add , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Thêm Mới Loại Tài Khoản Thành Công");
    });
  }  



  Edit_Loai_Tai_Khoan = (req , res, next ) => {
    const {ID} = req.params;
    const Data_Edit = {
        TenLoaiTaiKhoan : req.body.TenLoaiTaiKhoan.trim(),
    }

    if (!Data_Edit) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Edit_Loaitaikhoan_M (ID , Data_Edit , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Cập Nhật Loại Tài Khoản Thành Công");
    });
  }
  

  Delete_Loai_Tai_Khoan = (req , res, next) => {
    const {ID} = req.params;
    if (!ID) return res.send ("Không có dữ liệu");
    Connect_Data_Model.Delete_Loaitaikhoan_M (ID , (Error , Result) => {
        if (Error) return next(Error);
        res.send ("Xóa Loại Tài Thành Công");
    });
  }
  
}

module.exports = Loai_Tai_Khoan;
