var express = require('express');
var router = express.Router();
const Loading_Controler_Ket_Qua_Xet_Nghiem = require ('../Controller/Ket_Qua_Xet_Nghiem');
const Handle_Ket_Qua_Xet_Nghiem = new Loading_Controler_Ket_Qua_Xet_Nghiem ();
const Upload  = require ('../Middleware/upload');


router.get ('/' , Handle_Ket_Qua_Xet_Nghiem.Select_Ketquaxetnghiem);
router.delete ('/Delete/:ID' , Handle_Ket_Qua_Xet_Nghiem.Delete_Ketquaxetnghiem);
router.post ('/Add' ,  Upload.Upload_Image__.single("Image"), Handle_Ket_Qua_Xet_Nghiem.Add_Ketquaxetnghiem);
router.put ('/Edit/:ID' , Upload.Upload_Image__.single("Image"), Handle_Ket_Qua_Xet_Nghiem.Edit_Ketquaxetnghiem);
router.get ('/Detail/:ID' , Handle_Ket_Qua_Xet_Nghiem.Detail_Xet_Nghiem); 
router.get ('/LayTheoYeuCauXetNghiem/:ID' , Handle_Ket_Qua_Xet_Nghiem.GET_YeuCauXetNghiem);    
module.exports = router;       