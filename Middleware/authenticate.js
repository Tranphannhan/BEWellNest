const jwt = require('jsonwebtoken')
exports.kiemTraVaiTroDuocSi = async (req,res,next) =>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({message:'Bạn không có quyền truy cập do chưa có token', status:false})
    }
    const decoded = jwt.verify(token,'WellNest_User')
    if(decoded._Id_LoaiTaiKhoan.VaiTro === 'DuocSi' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin'){
        next()
    }else{
        return res.status(401).json({message:"Chỉ dược sĩ và quản trị viên mới được phép truy cập.", status:false})
    }
  
}

exports.kiemTraVaiTroKiThuatVien = async (req,res,next) =>{
    const token = req.header('token')
    if(!token){
        return res.status(401).json({message:'Bạn không có quyền truy cập do chưa có token', status:false})
    }
    const decoded = jwt.verify(token,'WellNest_User')
    if(decoded._Id_LoaiTaiKhoan.VaiTro === 'KiThuatVien' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin'){
        next()
    }else{
        return res.status(401).json({message:"Chỉ kĩ thuật viên và quản trị viên mới được phép truy cập.", status:false})
    }
  
}

exports.kiemTraVaiTroThuNgan = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập do chưa có token', status: false });
    }
    const decoded = jwt.verify(token, 'WellNest_User');
    if (decoded._Id_LoaiTaiKhoan.VaiTro === 'ThuNgan' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Chỉ thu ngân và quản trị viên mới được phép truy cập.', status: false });
    }
};

exports.kiemTraVaiTroTiepNhan = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập do chưa có token', status: false });
    }
    const decoded = jwt.verify(token, 'WellNest_User');
    if (decoded._Id_LoaiTaiKhoan.VaiTro === 'TiepNhan' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Chỉ nhân viên tiếp nhận và quản trị viên mới được phép truy cập.', status: false });
    }
};

exports.kiemTraVaiTroQuanLyKhoThuoc = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập do chưa có token', status: false });
    }
    const decoded = jwt.verify(token, 'WellNest_User');
    if (decoded._Id_LoaiTaiKhoan.VaiTro === 'QuanLyKhoThuoc' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Chỉ quản lý kho thuốc và quản trị viên mới được phép truy cập.', status: false });
    }
};

exports.kiemTraVaiTroQuanTriVien = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập do chưa có token', status: false });
    }
    const decoded = jwt.verify(token, 'WellNest_User');
    if (decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Chỉ quản trị viên mới được phép truy cập.', status: false });
    }
};

exports.kiemTraVaiTroBacSi = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({ message: 'Bạn không có quyền truy cập do chưa có token', status: false });
    }
    const decoded = jwt.verify(token, 'WellNest_User');
    if (decoded._VaiTro === 'BacSi' || decoded._Id_LoaiTaiKhoan.VaiTro === 'Admin') {
        next();
    } else {
        return res.status(401).json({ message: 'Chỉ bác sĩ và quản trị viên mới được phép truy cập.', status: false });
    }
};