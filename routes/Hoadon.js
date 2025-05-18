var express = require('express');
var router = express.Router();
const Loading_Controler_Hoadon = require ('../Controller/Hoadon');
const Handle_Hoadon = new  Loading_Controler_Hoadon ();

//Lấy hóa đơn theo loại hóa đơn
//Lấy Detail
router.get ('/Pagination' , Handle_Hoadon.Select_Hoadon);
router.post('/Add', Handle_Hoadon.Add_Hoadon);
router.put('/Edit/:ID', Handle_Hoadon.Upload_Hoadon);
router.delete('/Delete/:ID', Handle_Hoadon.Delete_Hoadon);

module.exports = router; 