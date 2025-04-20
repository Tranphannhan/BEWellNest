var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc_Chitiet = require ('../Controller/Don_Thuoc_Chi_Tiet');
const Handle_Donthuoc_Chitiet = new Loading_Controler_Donthuoc_Chitiet ();

router.get ('/' , Handle_Donthuoc_Chitiet.Runviews);
router.get ('/Select' , Handle_Donthuoc_Chitiet.Select_Donthuoc_Chitiet);
module.exports = router;
