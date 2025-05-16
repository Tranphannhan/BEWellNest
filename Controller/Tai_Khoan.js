const Connect_Select_Tai_Khoan = require("../Model/Tai_Khoan");
const Connect_Data_Model = new Connect_Select_Tai_Khoan();     
const Handle_Password = require('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password();

class Tai_Khoan_Controler {
    constructor(Password, ID, Image , Data_Add){
        this.Password = Password;
        this.ID = ID;
        this.Image = Image;
        this.Data_Add = Data_Add;
    }

    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loadding Thành Công" });
    }

    Select_Tai_Khoan = (req, res, next) => {
        Connect_Data_Model.Select_Tai_Khoan_M((error, result) => {
            if (error) return next(error);
            if (result.length < 1)
                return res.status(404).json({ message: "Dữ liệu Tài Khoản Rỗng" });
            res.status(200).json(result);
        });
    };  


    Add_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        this.Image =  req.file ? req.file.filename : 'default.webp';
        
        if (!this.Password) return res.status(400).json({ message: "Thêm Tài Khoản Thất Bại" }); // ✅ đã sửa
        this.Data_Add = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            SoDienThoai: req.body.SoDienThoai.trim(),
            SoCCCD: req.body.SoCCCD.trim(),
            Image : `http://localhost:5000/image/${this.Image}`
        };


        if (!this.Data_Add) return res.status(400).json({ message: "Không có dữ liệu tài khoản" }); 
        Connect_Data_Model.Add_Tai_Khoan_M(this.Data_Add,  (Error, Result) => {
            if (Error) return next(Error);
            res.status(201).json(Result)
        });
    }

      

    Edit_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        this.ID = req.params.ID;
        this.Image =  req.file ? req.file.filename : false;
        if (!this.Password || !this.ID) return res.status(400).json({ message: "Cập Nhật Tài Khoản Thất Bại" });


        this.Data_Edit = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            SoDienThoai: req.body.SoDienThoai.trim(),
            SoCCCD: req.body.SoCCCD.trim(),
            Image : `http://localhost:5000/image/${this.Image}`
        };

        if (!this.Image){
            delete this.Data_Edit.Image;
        }


        if (!this.Data_Edit)
            return res.status(400).json({ message: "Không có dữ liệu" });

        Connect_Data_Model.Edit_Tai_Khoan_M(this.ID, this.Data_Edit, (Error, Result) => {
            if (Error) return next(Error);
            res.status(200).json({ message: "Cập Nhật Tài Khoản Thành Công" }); 
        });
    }



    
    Delete_Tai_Khoan = (req, res, next) => {
        this.ID = req.params.ID;
        if (!this.ID)
            return res.status(400).json({ message: "Xóa Tài Khoản Thất Bại" }); // ✅ đã sửa

        Connect_Data_Model.Delete_Tai_Khoan_M(this.ID, (Error, Result) => {
            if (Error) return next(Error);
            res.status(200).json({ message: "Xóa Tài Khoản Thành Công" }); // ✅ đã sửa
        });
    }
}

module.exports = Tai_Khoan_Controler;
