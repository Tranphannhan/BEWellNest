var express = require('express');
var router = express.Router();
const Loading_Controler_Tai_Khoan = require ('../Controller/Tai_Khoan');
const Handle_Tai_Khoan = new Loading_Controler_Tai_Khoan ();
const Upload  = require ('../Middleware/upload');
    
  
router.get ('/' , Handle_Tai_Khoan.Select_Tai_Khoan);
router.get ('/LayTheoLoai/:ID' , Handle_Tai_Khoan.Get_ByLoai);
router.post ('/Add' , Upload.Upload_Image__.single("Image"), Handle_Tai_Khoan.Add_Tai_Khoan);
router.put ('/Edit/:ID' , Upload.Upload_Image__.single("Image") , Handle_Tai_Khoan.Edit_Tai_Khoan);
router.delete ('/Delete/:ID' , Handle_Tai_Khoan.Delete_Tai_Khoan);
router.get ('/Login/:Id_LoaiTaiKhoan' , Handle_Tai_Khoan.Check_Login);
module.exports = router;  