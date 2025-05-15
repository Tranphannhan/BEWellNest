var express = require('express');
var router = express.Router();
const Loading_Controler_Giadichvu = require ('../Controller/Gia_Dich_Vu');
const Handle_Giadichvu = new  Loading_Controler_Giadichvu ();

router.get ('/' , Handle_Giadichvu.Select_Giadichvu);
router.post('/Add', Handle_Giadichvu.Add_Giadichvu);
router.put('/Edit/:ID', Handle_Giadichvu.Upload_Giadichvu);
router.delete('/Delete/:ID', Handle_Giadichvu.Delete_Giadichvu);
module.exports = router; 