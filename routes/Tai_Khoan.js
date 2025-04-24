var express = require('express');
var router = express.Router();
const Loading_Controler_Tai_Khoan = require ('../Controller/Tai_Khoan');
const Handle_Tai_Khoan = new Loading_Controler_Tai_Khoan ();

router.get ('/' , Handle_Tai_Khoan.Runviews);
router.get ('/Select' , Handle_Tai_Khoan.Select_Tai_Khoan);
router.post ('/Add' , Handle_Tai_Khoan.Add_Tai_Khoan);
router.put ('/Edit/:ID' , Handle_Tai_Khoan.Edit_Tai_Khoan);
router.delete ('/Delete/:ID' , Handle_Tai_Khoan.Delete_Tai_Khoan);
module.exports = router;      