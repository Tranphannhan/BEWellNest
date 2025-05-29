var express = require('express');
var router = express.Router();
const Loading_Controler_LoaiXetNghiem = require ('../Controller/Loai_Xet_Nghiem');
const Handle_Loaixetnghiem = new  Loading_Controler_LoaiXetNghiem ();
const Upload  = require ('../Middleware/upload');


router.get ('/' , Handle_Loaixetnghiem.Select_LoaiXetNghiem);
router.post('/Add',  Upload.Upload_Image__.single("Image") , Handle_Loaixetnghiem.Add_LoaiXetNghiem);
router.put('/Edit/:ID', Handle_Loaixetnghiem.Upload_LoaiXetNghiem);
router.delete('/Delete/:ID', Handle_Loaixetnghiem.Delete_LoaiXetNghiem);
router.put ('/ThayDoiTrangThaiHoatDong/:ID', Handle_Loaixetnghiem.ThayDoiTrangThaiHoatDong);
  

module.exports = router; 