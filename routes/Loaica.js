var express = require('express');
var router = express.Router();
const Loading_Controler_LoaiCa = require ('../Controller/Loaica');
const Handle_Loaica = new Loading_Controler_LoaiCa ();

router.get ('/' , Handle_Loaica.Select_Loaica); 
router.post('/Add', Handle_Loaica.Add_Loaica);
router.delete('/Delete/:ID', Handle_Loaica.Delete_Loaica);
router.put('/Edit/:ID', Handle_Loaica.Update_Loaica);
module.exports = router;        