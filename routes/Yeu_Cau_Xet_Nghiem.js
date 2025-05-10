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
router.patch ('/Xacnhanthanhtoan/:ID_YeuCauXetNghiem', Handle_Yeucauxetnghiem.PaymentConfirmation);
router.get('/ChuaThanhToan', Handle_Yeucauxetnghiem.Get_Not_Yet_Paid);
router.patch ('/XacNhanTrangThai/:ID' , Handle_Yeucauxetnghiem.Status_handling);
module.exports = router;     
    