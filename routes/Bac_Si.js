var express = require('express');
var router = express.Router();
const Loaing_Controler_Bacsi = require ('../Controller/Bac_Si');
const Handle_Bac_Si = new Loaing_Controler_Bacsi();
const Upload  = require ('../Middleware/upload');
const { kiemTraVaiTroBacSi } = require('../Middleware/authenticate');


router.get ('/LayTheoTrangThai/Pagination' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Get_ByTrangThaiHoatDong); 
router.get ('/Pagination' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Select_Bacsi);  
router.get ('/detail/:ID' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Get_Dettail);
router.get ('/LayTheoKhoa/Pagination/:ID' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Get_ByKhoa); 
router.post('/Add',kiemTraVaiTroBacSi,  Upload.Upload_Image__.single("Image") , Handle_Bac_Si.add_Bacsi)
router.put('/Edit/:id',kiemTraVaiTroBacSi, Upload.Upload_Image__.single("Image") , Handle_Bac_Si.updateBacSi);
router.delete('/:id', Handle_Bac_Si.deleteBacSi);
router.post ('/Login' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Check_Login); 
router.get ('/Search' ,kiemTraVaiTroBacSi, Handle_Bac_Si.Search);
router.patch ('/StateChange/:id' ,kiemTraVaiTroBacSi, Handle_Bac_Si.StateChange);
module.exports = router;          