var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/' , Handle_Donthuoc.Runviews);
router.get ('/Select' , Handle_Donthuoc.Select_Donthuoc);
module.exports = router;

