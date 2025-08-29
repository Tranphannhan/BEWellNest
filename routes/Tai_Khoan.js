var express = require('express');
var router = express.Router();
const Loading_Controler_Tai_Khoan = require ('../Controller/Tai_Khoan');
const Handle_Tai_Khoan = new Loading_Controler_Tai_Khoan ();
const Upload  = require ('../Middleware/upload');
const { kiemTraVaiTroQuanTriVien } = require('../Middleware/authenticate');


router.get ('/Pagination' ,kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.Select_Tai_Khoan);
router.get ('/LayTheoLoai/:ID' ,kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.Get_ByLoai);
router.get ('/Detail/:ID',kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.Get_Tai_Khoan_ById);
router.post ('/Add' ,kiemTraVaiTroQuanTriVien, Upload.Upload_Image__.single("Image"), Handle_Tai_Khoan.Add_Tai_Khoan);
router.put ('/Edit/:ID' ,kiemTraVaiTroQuanTriVien, Upload.Upload_Image__.single("Image") , Handle_Tai_Khoan.Edit_Tai_Khoan);
router.delete ('/Delete/:ID' ,kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.Delete_Tai_Khoan);
router.post ('/Login/:Id_LoaiTaiKhoan' , Handle_Tai_Khoan.Check_Login);
router.get ('/Search' ,kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.Search);
router.patch ('/StateChange/:id' ,kiemTraVaiTroQuanTriVien, Handle_Tai_Khoan.StateChange);
module.exports = router;    