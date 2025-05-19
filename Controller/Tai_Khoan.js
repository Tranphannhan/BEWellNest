const Connect_Select_Tai_Khoan = require("../Model/Tai_Khoan");
const Connect_Data_Model = new Connect_Select_Tai_Khoan();     
const Handle_Password = require('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password();
const bcrypt = require('bcrypt');


class Tai_Khoan_Controler {
    constructor(Password, ID, Image , Data){
        this.Password = Password;
        this.ID = ID;
        this.Image = Image;
        this.Data = Data;
    }

    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loadding Thành Công" });
    }

    Select_Tai_Khoan = (req, res, next) => {
        const limit = parseInt (req.query.limit) || 7;
        const page = parseInt (req.query.page) || 1;

        Connect_Data_Model.Select_Tai_Khoan_M(limit , page ,(error, result) => {
            if (error) return next(error);
            if (result.length < 1)
                return res.status(404).json({ message: "Dữ liệu Tài Khoản Rỗng" });
            res.status(200).json(result);
        });
    };  



    Get_ByLoai = (req, res, next) => {
        const Id_Loai = req.params.ID;
        Connect_Data_Model.Get_ByLoai_M(Id_Loai,(error, result) => {
            if (error) return next(error);
            if (result.length < 1)
                return res.status(404).json({ message: "Dữ liệu Tài Khoản Rỗng" });
            res.status(200).json(result);
        });
    };  


    Add_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        this.Image =  req.file ? req.file.filename : 'default.webp';
        
        if (!this.Password) return res.status(400).json({ message: "Thêm Tài Khoản Thất Bại" });
        this.Data = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            SoDienThoai: req.body.SoDienThoai.trim(),
            SoCCCD: req.body.SoCCCD.trim(),
            Image : `http://localhost:5000/image/${this.Image}`
        };


        if (!this.Data) return res.status(400).json({ message: "Không có dữ liệu tài khoản" }); 

        const Continue = await Connect_Data_Model.Check_SoDienThoai_register(this.Data.SoDienThoai);

        if(Continue === false) return res.status(500).json({message:"Số điện thoại này đã được đăng ký rồi"})

        Connect_Data_Model.Add_Tai_Khoan_M(this.Data,  (Error, Result) => {
            if (Error) return next(Error);
            res.status(201).json(Result)
        });
    }


    Check_Login = async (req , res , next) => {
        const Password_Login  = req.body.MatKhau.trim();
        const SDT_Login  = req.body.SoDienThoai.trim();
        const Id_LoaiTaiKhoan = req.params.Id_LoaiTaiKhoan;
        if (!Password_Login || !SDT_Login || !Id_LoaiTaiKhoan) return res.status(400).json ({message : "Đăng Nhập Tài Khoản Thất Bại"});
    
        Connect_Data_Model.Check_Login__M  (SDT_Login ,Id_LoaiTaiKhoan , async (error , result) => {
            if (error) return next (error);
            if (!result) return res.status(200).json ({message : "Không Tìm Thất Tài Khoản Đăng Nhập Vui Lòng Đăng Nhập Lại"});
            const isMatch = await bcrypt.compare(Password_Login, result.MatKhau);
            if (!isMatch) return  res.status (200).json ({message : 'Đăng Nhập Thất Bại' ,Data_Token_ : false });
            
            const Data_Token_ = {
                _id : result._id,
                _Id_LoaiTaiKhoan : result.Id_LoaiTaiKhoan,
                _TenTaiKhoan :  result.TenTaiKhoan,
                _SoDienThoai : result.SoDienThoai,
                _SoCCCD : result.SoCCCD,
                _Image : result.Image
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



      

    Edit_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        this.ID = req.params.ID;
        this.Image =  req.file ? req.file.filename : false;
        if (!this.Password || !this.ID) return res.status(400).json({ message: "Cập Nhật Tài Khoản Thất Bại" });

        this.Data = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            SoDienThoai: req.body.SoDienThoai.trim(),
            SoCCCD: req.body.SoCCCD.trim(),
            Image : `http://localhost:5000/image/${this.Image}`
        };

        if (!this.Image){
            delete this.Data.Image;
        }

        if (!this.Data) return res.status(400).json({ message: "Không có dữ liệu" });
        Connect_Data_Model.Edit_Tai_Khoan_M(this.ID, this.Data, (Error, Result) => {
            if (Error) return next(Error);
            res.status(200).json({ message: "Cập Nhật Tài Khoản Thành Công" }); 
        });
    }



    
    Delete_Tai_Khoan = (req, res, next) => {
        this.ID = req.params.ID;
        if (!this.ID) return res.status(400).json({ message: "Xóa Tài Khoản Thất Bại" }); 
        Connect_Data_Model.Delete_Tai_Khoan_M(this.ID, (Error, Result) => {
            if (Error) return next(Error);
            res.status(200).json({ message: "Xóa Tài Khoản Thành Công" }); 
        });
    }
}

module.exports = Tai_Khoan_Controler;
