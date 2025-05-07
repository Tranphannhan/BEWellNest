var express = require('express');
var router = express.Router();
const Loading_Controler_Yeucauxetnghiem = require ('../Controller/Yeu_Cau_Xet_Nghiem');
const Handle_Yeucauxetnghiem = new Loading_Controler_Yeucauxetnghiem ();

router.get ('/' , Handle_Yeucauxetnghiem.Runviews);
router.get ('/Select' , Handle_Yeucauxetnghiem.Select_Yeucauxetnghiem);
router.post ('/Add' , Handle_Yeucauxetnghiem.Add_Yeucauxetnghiem);
router.put ('/Edit/:ID' , Handle_Yeucauxetnghiem.Edit_Yeucauxetnghiem);
router.delete ('/Delete/:ID' , Handle_Yeucauxetnghiem.Delete_Yeucauxetnghiem);
router.get('/GetById_PhongTB_date', Handle_Yeucauxetnghiem.Get_ById_PTB_Date);

module.exports = router;    