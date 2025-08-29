var express = require('express');
var router = express.Router();
const Loading_Controler_Chitietkhamlamsàng = require ('../Controller/Chi_Tiet_Kham_Lam_Sang');
const { kiemTraVaiTroBacSi } = require('../Middleware/authenticate');
const Chitietkhambenh = new Loading_Controler_Chitietkhamlamsàng ();

router.get ('/' ,kiemTraVaiTroBacSi, Chitietkhambenh.Select_Chitietkhambenh);
router.get ('/LayTheoPhieuKhamBenh' ,kiemTraVaiTroBacSi, Chitietkhambenh.LayTheoPhieuKhamBenh);
router.get ('/KiemTraCoChiTietKhamLamSang' ,kiemTraVaiTroBacSi, Chitietkhambenh.KiemTraCoChiTietKhamLamSang);
router.post('/Add',kiemTraVaiTroBacSi, Chitietkhambenh.add_Chitietkhambenh);

router.delete('/Delete/:ID',kiemTraVaiTroBacSi, Chitietkhambenh.Delete_Chitietkhambenh);
router.patch('/Update/:ID',kiemTraVaiTroBacSi, Chitietkhambenh.Update_Chitietkhambenh);
// router.get ('/LayTheoDonThuoc/:ID' , Chitietkhambenh.Detail_Donthuoc);
module.exports = router;