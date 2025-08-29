 var express = require('express');
var router = express.Router();
const Loading_Controler_NhomThuoc = require ('../Controller/Nhom_Thuoc');
const { kiemTraVaiTroBacSi } = require('../Middleware/authenticate');
const Handle_Thuoc = new Loading_Controler_NhomThuoc ();

router.get ('/pagination' ,kiemTraVaiTroBacSi, Handle_Thuoc.Select_Nhomthuoc);
router.get('/Detail/:ID',kiemTraVaiTroBacSi, Handle_Thuoc.Detail_Nhomthuoc);
router.post ('/Add' ,kiemTraVaiTroBacSi, Handle_Thuoc.Add_Nhomthuoc);
router.put ('/Edit/:ID' ,kiemTraVaiTroBacSi, Handle_Thuoc.Edit_Nhomthuoc);
router.delete ('/Delete/:ID' , Handle_Thuoc.Delete_Nhomthuoc);
router.get ('/TimKiemNhomThuoc' ,kiemTraVaiTroBacSi, Handle_Thuoc.TimKiemNhomThuoc);
router.patch ('/StateChange/:id' ,kiemTraVaiTroBacSi, Handle_Thuoc.StateChange);
module.exports = router;    

    