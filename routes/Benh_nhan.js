var express = require('express');
var router = express.Router();
const Loaing_Controler_Benhnhan = require ('../Controller/Benh_nhan');
const Handle_Benhnhan = new Loaing_Controler_Benhnhan ();

router.get ('/' , Handle_Benhnhan.Runviews);
router.get ('/Select' , Handle_Benhnhan.Select_Benhnhan);

module.exports = router;  