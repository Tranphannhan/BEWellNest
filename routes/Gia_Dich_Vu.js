var express = require('express');
var router = express.Router();
const Loading_Controler_Giadichvu = require ('../Controller/Gia_Dich_Vu');
const Handle_Giadichvu = new  Loading_Controler_Giadichvu ();

router.get ('/ServiceGroup/Pagination' , Handle_Giadichvu.Select_Giadichvu);
router.get ('/ExaminationPriceGroup/Pagination' , Handle_Giadichvu.Select_GiaKham);
router.get('/Detail/:ID', Handle_Giadichvu.GetDetail_Giadichvu);
router.post('/Add', Handle_Giadichvu.Add_Giadichvu);
router.put('/Edit/:ID', Handle_Giadichvu.Upload_Giadichvu);
router.delete('/Delete/:ID', Handle_Giadichvu.Delete_Giadichvu);
router.patch ('/SuaTrangThai/:ID', Handle_Giadichvu.SuaTrangThai);
router.get ('/Search' , Handle_Giadichvu.Search);
module.exports = router;