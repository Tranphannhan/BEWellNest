var express = require('express');
var router = express.Router();
const Loading_Controler_C = require ('../Controller/Chi_So_Sinh_Ton');
const Load = new Loading_Controler_C ();

router.get ('/' , Load.Select_Chisosinhton__C);
router.post ('/Add', Load.Add_Chisosinhton__C);

// http://localhost:5000/Chi_So_Sinh_Ton/Upload/683f19d08a572c6523c546db
router.put('/Upload/:ID', Load.Upload_Chisosinhton__C);

// http://localhost:5000/Chi_So_Sinh_Ton/Delete/683f247fc0ab1c4f26403e3d
router.delete('/Delete/:ID', Load.Delete__chisosinhton__C);

module.exports = router;
     