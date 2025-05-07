const Connect_Select_Tai_Khoan = require("../Model/Tai_Khoan");
const Connect_Data_Model = new Connect_Select_Tai_Khoan();     
const Handle_Password = require('../Middleware/Password_encryption');
const Connect_Handle_Password = new Handle_Password();

class Tai_Khoan_Controler {
    constructor(Password, ID, Data_Add) {
        this.Password = Password;
        this.ID = ID;
        this.Data_Add = Data_Add;
    }

    Runviews = (req, res, next) => {
        res.status(200).json({ message: "Loadding Thành Công" }); // ✅ đã sửa
    }

    Select_Tai_Khoan = (req, res, next) => {
        Connect_Data_Model.Select_Tai_Khoan_M((error, result) => {
            if (error) return next(error);
            if (result.length < 1)
                return res.status(404).json({ message: "Dữ liệu Tài Khoản Rỗng" }); // ✅ đã sửa
            res.status(200).json(result);
        });
    };

    Add_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        if (!this.Password)
            return res.status(400).json({ message: "Thêm Tài Khoản Thất Bại" }); // ✅ đã sửa

        this.Data_Add = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            TenDangNhap: req.body.TenDangNhap.trim(),
            TenLoaiTaiKhoan: req.body.TenLoaiTaiKhoan.trim()
        };

        if (!this.Data_Add)
            return res.status(400).json({ message: "Không có dữ liệu tài khoản" }); // ✅ đã sửa

        Connect_Data_Model.Add_Tai_Khoan_M(this.Data_Add, (Error, Result) => {
            if (Error) return next(Error);
            res.status(201).json({ message: "Thêm Mới Tài Khoản Thành Công" }); // ✅ đã sửa
        });
    }

    Edit_Tai_Khoan = async (req, res, next) => {
        this.Password = await Connect_Handle_Password.hashPassword(req.body.MatKhau.trim());
        this.ID = req.params.ID;

        if (!this.Password || !this.ID)
            return res.status(400).json({ message: "Cập Nhật Tài Khoản Thất Bại" }); // ✅ đã sửa

        this.Data_Edit = {
            Id_LoaiTaiKhoan: req.body.Id_LoaiTaiKhoan.trim(),
            TenTaiKhoan: req.body.TenTaiKhoan.trim(),
            MatKhau: this.Password,
            TenDangNhap: req.body.TenDangNhap.trim(),
            TenLoaiTaiKhoan: req.body.TenLoaiTaiKhoan.trim()
        };

        if (!this.Data_Edit)
            return res.status(400).json({ message: "Không có dữ liệu" }); // ✅ đã sửa

        Connect_Data_Model.Edit_Tai_Khoan_M(this.ID, this.Data_Edit, (Error, Result) => {
            if (Error) return next(Error);
            res.status(200).json({ message: "Cập Nhật Tài Khoản Thành Công" }); // ✅ đã sửa
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
