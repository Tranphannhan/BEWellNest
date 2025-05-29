var express = require('express');
var router = express.Router();
const Loading_Controler_Hoadon = require ('../Controller/Hoadon');
const Handle_Hoadon = new  Loading_Controler_Hoadon ();


router.get ('/Pagination' , Handle_Hoadon.Select_Hoadon);
router.get ('/LayTheoLoai' , Handle_Hoadon.LayTheoLoai);
router.post('/Add', Handle_Hoadon.Add_Hoadon);
router.put('/Edit/:ID', Handle_Hoadon.Upload_Hoadon);
router.delete('/Delete/:ID', Handle_Hoadon.Delete_Hoadon);
router.get ('/Detail/:ID' , Handle_Hoadon.Detail_Hoadon); 
router.get ('/LayTheoPhieuKhamBenhLoaiHoaDon/:ID' ,Handle_Hoadon.LayTheoPhieuKhamBenhLoaiHoaDon);
module.exports = router;    