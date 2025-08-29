var express = require('express');
var router = express.Router();
const Loading_Controler_Thuoc = require ('../Controller/Thuoc');
const { kiemTraVaiTroBacSi } = require('../Middleware/authenticate');
const Handle_Thuoc = new Loading_Controler_Thuoc ();

router.get ('/' ,kiemTraVaiTroBacSi, Handle_Thuoc.Select_Donthuoc);
router.get ('/LayTheoNhom/Pagination/:Id_NhomThuoc' ,kiemTraVaiTroBacSi, Handle_Thuoc.Get_TakeInGroups);
router.get ('/Detail/:ID' ,kiemTraVaiTroBacSi, Handle_Thuoc.Get_Detail);
router.get ('/Pagination' ,kiemTraVaiTroBacSi, Handle_Thuoc.Get_Pagination);
router.post ('/Add' ,kiemTraVaiTroBacSi, Handle_Thuoc.Add_Donthuoc);
router.put ('/Edit/:ID' ,kiemTraVaiTroBacSi, Handle_Thuoc.Edit_Donthuoc);
router.delete ('/Delete/:ID' ,kiemTraVaiTroBacSi, Handle_Thuoc.Delete_Donthuoc);
router.get ('/TimKiemTenThuoc' ,kiemTraVaiTroBacSi, Handle_Thuoc.TimKiemTenThuoc);
router.patch ('/StateChange/:id' ,kiemTraVaiTroBacSi, Handle_Thuoc.StateChange);
module.exports = router;

   