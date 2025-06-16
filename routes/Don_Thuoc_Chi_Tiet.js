var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc_Chitiet = require ('../Controller/Don_Thuoc_Chi_Tiet');
const Handle_Donthuoc_Chitiet = new Loading_Controler_Donthuoc_Chitiet ();

// Lấy đơn thuốc chi tiết theo Id_DonThuoc (Huân làm)
router.get ('/' , Handle_Donthuoc_Chitiet.Select_Donthuoc_Chitiet);
router.post('/Add', Handle_Donthuoc_Chitiet.add_Donthuoc_Chitiet);
router.delete('/Delete/:id', Handle_Donthuoc_Chitiet.deleteDonthuoc_Chitiet);
router.put('/:id', Handle_Donthuoc_Chitiet.updateDonthuoc_Chitiet);
router.get ('/LayTheoDonThuoc/:ID' , Handle_Donthuoc_Chitiet.Detail_Donthuoc);
module.exports = router;
  