 var express = require('express');
var router = express.Router();
const Loading_Controler_NhomThuoc = require ('../Controller/Nhom_Thuoc');
const Handle_Thuoc = new Loading_Controler_NhomThuoc ();

router.get ('/' , Handle_Thuoc.Select_Nhomthuoc); // Thêm pagination
router.post ('/Add' , Handle_Thuoc.Add_Nhomthuoc);
router.put ('/Edit/:ID' , Handle_Thuoc.Edit_Nhomthuoc);
router.delete ('/Delete/:ID' , Handle_Thuoc.Delete_Nhomthuoc);
module.exports = router;    

