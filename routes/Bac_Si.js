var express = require('express');
var router = express.Router();
const Loaing_Controler_Bacsi = require ('../Controller/Bac_Si');
const Handle_Bac_Si = new Loaing_Controler_Bacsi();
const Upload  = require ('../Middleware/upload');


router.get ('/LayTheoTrangThai/Pagination' , Handle_Bac_Si.Get_ByTrangThaiHoatDong); 
router.get ('/Pagination' , Handle_Bac_Si.Select_Bacsi);  
router.get ('/detail/:ID' , Handle_Bac_Si.Get_Dettail);
router.get ('/LayTheoKhoa/Pagination/:ID' , Handle_Bac_Si.Get_ByKhoa); 
router.post('/Add',  Upload.Upload_Image__.single("Image") , Handle_Bac_Si.add_Bacsi)
router.put('/Edit/:id', Upload.Upload_Image__.single("Image") , Handle_Bac_Si.updateBacSi);
router.delete('/:id', Handle_Bac_Si.deleteBacSi);
router.post ('/Login' , Handle_Bac_Si.Check_Login); 
router.get ('/Search' , Handle_Bac_Si.Search);
module.exports = router;          