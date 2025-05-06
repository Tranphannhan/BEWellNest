
var express = require('express');
var router = express.Router();
const Loading_Controler_Loai_Tai_Khoan = require ('../Controller/Loai_Tai_Khoan');
const Handle_Loai_Tai_Khoan = new Loading_Controler_Loai_Tai_Khoan ();

router.get ('/' , Handle_Loai_Tai_Khoan.Runviews);
router.get ('/Select' , Handle_Loai_Tai_Khoan.Select_Loai_Tai_Khoan);
router.post ('/Add' , Handle_Loai_Tai_Khoan.Add_Loai_Tai_Khoan);
router.put ('/Edit/:ID' , Handle_Loai_Tai_Khoan.Edit_Loai_Tai_Khoan);
router.delete ('/Delete/:ID' , Handle_Loai_Tai_Khoan.Delete_Loai_Tai_Khoan);
module.exports = router;      