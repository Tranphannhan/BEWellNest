var express = require('express');
var router = express.Router();
const Loading_Controler_Phieu_Kham_Benh = require ('../Controller/Phieu_Kham_Benh');
const Handle_Phieu_Kham_Benh = new Loading_Controler_Phieu_Kham_Benh ();

router.get ('/' , Handle_Phieu_Kham_Benh.Runviews);
router.get ('/Select' , Handle_Phieu_Kham_Benh.Select_Phieukhambenh);
router.post ('/Add' , Handle_Phieu_Kham_Benh.Add_Phieukhambenh);
router.put ('/Edit/:ID' , Handle_Phieu_Kham_Benh.Edit_Phieukhambenh);
router.delete ('/Delete/:ID' , Handle_Phieu_Kham_Benh.Delete_Phieukham);
router.get ('/Xacnhanthanhtoan/:Id_TheKhamBenh', Handle_Phieu_Kham_Benh.Check_Status);

// http://localhost:5000/Phieu_Kham_Benh/GetById_CaKham_Date?Id=681b0e9e78c6375f89a6abbf&ngay=2025-06-05
router.get ('/GetById_CaKham_Date/' , Handle_Phieu_Kham_Benh.Fill_Cakhambenh);

module.exports = router;       