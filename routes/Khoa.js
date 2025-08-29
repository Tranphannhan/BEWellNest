var express = require('express');
var router = express.Router();
const Loading_Controler_Khoa = require ('../Controller/Khoa');
const { kiemTraVaiTroBacSi, kiemTraVaiTroQuanTriVien, kiemTraVaiTroTiepNhan } = require('../Middleware/authenticate');
const Handle_Khoa = new Loading_Controler_Khoa ();

router.get ('/Pagination' ,kiemTraVaiTroBacSi, Handle_Khoa.Select_Khoa); 
router.get('/Detail/:id',kiemTraVaiTroBacSi, Handle_Khoa.getDetailKhoa);
router.post('/Add',kiemTraVaiTroBacSi, Handle_Khoa.add_Khoa);
router.delete('/:id', Handle_Khoa.deleteKhoa);
router.put('/:id',kiemTraVaiTroQuanTriVien, Handle_Khoa.updateKhoa);
router.patch ('/TrangThaiHoatDong/:ID' ,kiemTraVaiTroQuanTriVien, Handle_Khoa.ThayDoiTrangThaiHoatDong);
router.get ('/Search' ,kiemTraVaiTroBacSi, Handle_Khoa.Search);
router.patch('/CanLamSang/:ID',kiemTraVaiTroQuanTriVien, Handle_Khoa.updateTrangThaiCanLamSang);
router.post('/Suggest',kiemTraVaiTroTiepNhan, Handle_Khoa.suggestKhoa); // Thêm route mới cho gợi ý khoa
module.exports = router;    
   