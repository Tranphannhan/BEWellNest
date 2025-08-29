var express = require('express');
var router = express.Router();
const Loading_Controler_Giadichvu = require ('../Controller/Gia_Dich_Vu');
const { kiemTraVaiTroQuanTriVien } = require('../Middleware/authenticate');
const Handle_Giadichvu = new  Loading_Controler_Giadichvu ();

router.get ('/ServiceGroup/Pagination' ,kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Select_Giadichvu);
router.get ('/ExaminationPriceGroup/Pagination' ,kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Select_GiaKham);
router.get('/Detail/:ID',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.GetDetail_Giadichvu);
router.post('/Add',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Add_Giadichvu);
router.put('/Edit/:ID',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Upload_Giadichvu);
router.delete('/Delete/:ID', Handle_Giadichvu.Delete_Giadichvu);
router.patch ('/SuaTrangThai/:ID',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.SuaTrangThai);
router.get ('/Search' ,kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Search);
router.put('/ActivateGiaKham/:ID',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.Activate_GiaKham);
router.get('/ActiveGiaKham',kiemTraVaiTroQuanTriVien, Handle_Giadichvu.GetActive_GiaKham);
module.exports = router;