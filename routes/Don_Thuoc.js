var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/' , Handle_Donthuoc.Select_Donthuoc);
router.post('/', Handle_Donthuoc.add_Donthuoc);
router.delete('/:id', Handle_Donthuoc.deleteDonthuoc);
router.put('/:id', Handle_Donthuoc.updateDonthuoc);
router.patch ('/Xacnhanthanhtoan/:ID_DonThuoc', Handle_Donthuoc.PaymentConfirmation);
router.get('/ChuaThanhToan', Handle_Donthuoc.Get_Not_Yet_Paid);
module.exports = router;

    