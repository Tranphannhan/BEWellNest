var express = require('express');
var router = express.Router();
const Loading_Controler_Phong_Thiet_Bi = require ('../Controller/Phong_Thiet_Bi');
const Handle_Phong_Thiet_Bi = new Loading_Controler_Phong_Thiet_Bi ();
const Upload  = require ('../Middleware/upload');
const { kiemTraVaiTroBacSiXetNghiem, kiemTraVaiTroQuanTriVien } = require('../Middleware/authenticate');


router.get ('/Pagination' ,kiemTraVaiTroBacSiXetNghiem, Handle_Phong_Thiet_Bi.Select_Phong_Thiet_Bi);    
router.get('/Detail/:id',kiemTraVaiTroBacSiXetNghiem, Handle_Phong_Thiet_Bi.getDetailPhong_Thiet_Bi);
router.post('/Add',kiemTraVaiTroQuanTriVien, Upload.Upload_Image__.single("Image"), Handle_Phong_Thiet_Bi.add_Phong_Thiet_Bi);
router.delete('/:id', Handle_Phong_Thiet_Bi.deletePhong_Thiet_Bi);
router.put('/:id',kiemTraVaiTroQuanTriVien, Upload.Upload_Image__.single("Image"),Handle_Phong_Thiet_Bi.updatePhong_Thiet_Bi);
router.get('/Search/:room' ,kiemTraVaiTroBacSiXetNghiem, Handle_Phong_Thiet_Bi.SearchRoom);
router.patch ('/StateChange/:id' ,kiemTraVaiTroQuanTriVien, Handle_Phong_Thiet_Bi.StateChange);
module.exports = router;         