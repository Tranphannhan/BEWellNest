var express = require('express');
var router = express.Router();
const Loading_Controler_Phong_Kham = require ('../Controller/Phong_Kham');
const Handle_Phong_Kham = new Loading_Controler_Phong_Kham ();


router.get ('/Pagination' , Handle_Phong_Kham.Select_Phong_Kham);
router.get ('/LayTheoKhoa/:ID' , Handle_Phong_Kham.Get_ByKhoa);
router.post('/', Handle_Phong_Kham.add_Phong_Kham);
router.delete('/:id', Handle_Phong_Kham.deletePhong_Kham);
router.put('/:id', Handle_Phong_Kham.updatePhong_Kham);
module.exports = router;      