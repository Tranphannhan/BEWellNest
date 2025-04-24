const Connect_Select_Tai_Khoan = require("../Model/Tai_Khoan");
const Connect_Data_Model = new Connect_Select_Tai_Khoan();     
const Handle_Password = require ('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password ();


class Tai_Khoan_Controler {
    constructor (Password , ID , Data_Add){
        this.Password = Password;
        this.ID = ID;
        this.Data_Add = Data_Add
    }

    Runviews = (req, res, next) => res.send("Loadding Thành Công")

    Select_Tai_Khoan = (req, res, next) => {
        Connect_Data_Model.Select_Tai_Khoan_M ((error, result) => {
        if (error) return next(error);
        if (result.length < 1) return res.send ("Dữ liệu Tai Khoan  Rỗng");
        res.status(200).json(result);
        });
    };


    Add_Tai_Khoan = async (req , res , next) => {
        this.Password = await Connect_Handle_Password.hashPassword (req.body.MatKhau.trim());
        if (!this.Password) return res.send ("Thêm Tài Khoản Thất Bại");
        this.Data_Add =  {
            Id_LoaiTaiKhoan : req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan : req.body.TenTaiKhoan.trim(),
            MatKhau : this.Password,
            TenDangNhap : req.body.TenDangNhap.trim(),
            TenLoaiTaiKhoan : req.body.TenLoaiTaiKhoan.trim()
        }

        if (!this.Data_Add) return res.send ("Không có dữ liệu tài khoản");
        Connect_Data_Model.Add_Tai_Khoan_M (this.Data_Add , (Error , Result) => {
            if (Error) return next(Error);
            res.send ("Thêm Mới Tài Khoản Thành Công");
        });
    }  

 
      Edit_Tai_Khoan = async (req , res, next ) => {
        this.Password = await Connect_Handle_Password.hashPassword (req.body.MatKhau.trim());
        this.ID = req.params.ID;
        if (!this.Password && !this.ID) return res.send ("Cập Nhật Tài Khoản Thất Bại");
        this.Data_Edit = {
            Id_LoaiTaiKhoan : req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan : req.body.TenTaiKhoan.trim(),
            MatKhau : this.Password,
            TenDangNhap : req.body.TenDangNhap.trim(),
            TenLoaiTaiKhoan : req.body.TenLoaiTaiKhoan.trim()
        }

        if (!this.Data_Edit) return res.send ("Không có dữ liệu");
        Connect_Data_Model.Edit_Tai_Khoan_M (this.ID , this.Data_Edit , (Error , Result) => {
            if (Error) return next(Error);
            res.send ("Cập Nhật Tài Khoản Thành Công");
        });
      }
    

      Delete_Tai_Khoan = (req , res, next) => {
        this.ID = req.params.ID;
        if (!this.ID) return res.send ("Xóa Tài Khoản Thất Bại");
        Connect_Data_Model.Delete_Tai_Khoan_M (this.ID , (Error , Result) => {
            if (Error) return next(Error);
            res.send ("Xóa Tài Khoản Thành Công");
        });
      }
  
}

module.exports = Tai_Khoan_Controler;
