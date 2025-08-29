var express = require('express');
var router = express.Router();
const Loading_Controler_Phong_Kham = require ('../Controller/Phong_Kham');
const { kiemTraVaiTroBacSi } = require('../Middleware/authenticate');
const Handle_Phong_Kham = new Loading_Controler_Phong_Kham ();


router.get ('/Pagination' ,kiemTraVaiTroBacSi, Handle_Phong_Kham.Select_Phong_Kham);
router.get ('/LayTheoKhoa/:ID' ,kiemTraVaiTroBacSi, Handle_Phong_Kham.Get_ByKhoa);
router.get ('/LayPhongTrongTheoKhoa/:ID' ,kiemTraVaiTroBacSi, Handle_Phong_Kham.Get_ByKhoa_Empty);
router.get('/Detail/:id',kiemTraVaiTroBacSi, Handle_Phong_Kham.getDetailPhong_Kham);
router.post('/', Handle_Phong_Kham.add_Phong_Kham);
router.delete('/:id',kiemTraVaiTroBacSi, Handle_Phong_Kham.deletePhong_Kham);
router.put('/:id',kiemTraVaiTroBacSi, Handle_Phong_Kham.updatePhong_Kham);
router.get ('/Search/:room' ,kiemTraVaiTroBacSi, Handle_Phong_Kham.SearchRoom);
router.patch ('/StateChange/:id' ,kiemTraVaiTroBacSi, Handle_Phong_Kham.StateChange);
module.exports = router;      