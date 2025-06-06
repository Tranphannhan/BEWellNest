var express = require('express');
var router = express.Router();
const Loading_Controler_Khoa = require ('../Controller/Khoa');
const Handle_Khoa = new Loading_Controler_Khoa ();

router.get ('/Pagination' , Handle_Khoa.Select_Khoa); 
router.post('/Add', Handle_Khoa.add_Khoa);
router.delete('/:id', Handle_Khoa.deleteKhoa);
router.put('/:id', Handle_Khoa.updateKhoa);
router.patch ('/TrangThaiHoatDong/:ID' , Handle_Khoa.ThayDoiTrangThaiHoatDong);
module.exports = router;    
   