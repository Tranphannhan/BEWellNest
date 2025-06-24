var express = require('express');
var router = express.Router();
const Loading_Controler_Chitietkhamlamsàng = require ('../Controller/Chi_Tiet_Kham_Lam_Sang');
const Chitietkhambenh = new Loading_Controler_Chitietkhamlamsàng ();

router.get ('/' , Chitietkhambenh.Select_Chitietkhambenh);
router.get ('/LayTheoPhieuKhamBenh' , Chitietkhambenh.LayTheoPhieuKhamBenh);
router.get ('/KiemTraCoChiTietKhamLamSang' , Chitietkhambenh.KiemTraCoChiTietKhamLamSang);
router.post('/Add', Chitietkhambenh.add_Chitietkhambenh);

router.delete('/Delete/:ID', Chitietkhambenh.Delete_Chitietkhambenh);
router.patch('/Update/:ID', Chitietkhambenh.Update_Chitietkhambenh);
// router.get ('/LayTheoDonThuoc/:ID' , Chitietkhambenh.Detail_Donthuoc);
module.exports = router;