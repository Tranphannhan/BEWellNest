 var express = require('express');
var router = express.Router();
const Loading_Controler_Nhasanxuat = require ('../Controller/Nha_San_Xuat');
const Handle_Nhasanxuat = new Loading_Controler_Nhasanxuat ();

router.get ('/Pagination' , Handle_Nhasanxuat.Select_Nhasanxuat); 
router.post ('/Add' , Handle_Nhasanxuat.Add_Nhasanxuat);
router.put ('/Edit/:ID' , Handle_Nhasanxuat.Edit_Nhasanxuat);
router.delete ('/Delete/:ID' , Handle_Nhasanxuat.Delete_Nhasanxuat);
module.exports = router;    