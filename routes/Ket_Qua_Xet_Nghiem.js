var express = require('express');
var router = express.Router();
const Loading_Controler_Ket_Qua_Xet_Nghiem = require ('../Controller/Ket_Qua_Xet_Nghiem');
const Handle_Ket_Qua_Xet_Nghiem = new Loading_Controler_Ket_Qua_Xet_Nghiem ();
const Upload  = require ('../Middleware/upload');

router.get ('/' , Handle_Ket_Qua_Xet_Nghiem.Select_Ketquaxetnghiem);
router.delete ('/Delete/:ID' , Handle_Ket_Qua_Xet_Nghiem.Delete_Ketquaxetnghiem);

// router.post ('/Add' , Handle_Ket_Qua_Xet_Nghiem.Add_Ketquaxetnghiem);
router.post ('/Add' ,  Upload.uploadMiddleware_Ketquaxetnghiem.single("Anh_Xet_Nghiem"), Handle_Ket_Qua_Xet_Nghiem.Add_Ketquaxetnghiem);
router.put ('/Edit/:ID' , Upload.uploadMiddleware_Ketquaxetnghiem.single("Anh_Xet_Nghiem"), Handle_Ket_Qua_Xet_Nghiem.Edit_Ketquaxetnghiem);
module.exports = router;