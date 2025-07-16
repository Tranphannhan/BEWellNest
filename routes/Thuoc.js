var express = require('express');
var router = express.Router();
const Loading_Controler_Thuoc = require ('../Controller/Thuoc');
const Handle_Thuoc = new Loading_Controler_Thuoc ();

router.get ('/' , Handle_Thuoc.Select_Donthuoc);
router.get ('/LayTheoNhom/Pagination/:Id_NhomThuoc' , Handle_Thuoc.Get_TakeInGroups);
router.get ('/Detail/:ID' , Handle_Thuoc.Get_Detail);
router.get ('/Pagination' , Handle_Thuoc.Get_Pagination);
router.post ('/Add' , Handle_Thuoc.Add_Donthuoc);
router.put ('/Edit/:ID' , Handle_Thuoc.Edit_Donthuoc);
router.delete ('/Delete/:ID' , Handle_Thuoc.Delete_Donthuoc);
router.get ('/TimKiemTenThuoc' , Handle_Thuoc.TimKiemTenThuoc);
router.patch ('/StateChange/:id' , Handle_Thuoc.StateChange);
module.exports = router;

   