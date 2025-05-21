var express = require('express');
var router = express.Router();
const Loading_Controler_Phong_Thiet_Bi = require ('../Controller/Phong_Thiet_Bi');
const Handle_Phong_Thiet_Bi = new Loading_Controler_Phong_Thiet_Bi ();
const Upload  = require ('../Middleware/upload');


router.get ('/Pagination' , Handle_Phong_Thiet_Bi.Select_Phong_Thiet_Bi);    
router.post('/Add', Upload.Upload_Image__.single("Image"), Handle_Phong_Thiet_Bi.add_Phong_Thiet_Bi);
router.delete('/:id', Handle_Phong_Thiet_Bi.deletePhong_Thiet_Bi);
router.put('/:id', Handle_Phong_Thiet_Bi.updatePhong_Thiet_Bi);
module.exports = router;         