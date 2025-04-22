var express = require('express');
var router = express.Router();
const Loading_Controler_Ket_Qua_Xet_Nghiem = require ('../Controller/Ket_Qua_Xet_Nghiem');
const Handle_Ket_Qua_Xet_Nghiem = new Loading_Controler_Ket_Qua_Xet_Nghiem ();

router.get ('/' , Handle_Ket_Qua_Xet_Nghiem.Runviews);
router.get ('/Select' , Handle_Ket_Qua_Xet_Nghiem.Select_Ketquaxetnghiem);
router.post ('/Add' , Handle_Ket_Qua_Xet_Nghiem.Add_Ketquaxetnghiem);
router.put ('/Edit/:ID' , Handle_Ket_Qua_Xet_Nghiem.Edit_Ketquaxetnghiem);
router.delete ('/Delete/:ID' , Handle_Ket_Qua_Xet_Nghiem.Delete_Ketquaxetnghiem);
module.exports = router;        