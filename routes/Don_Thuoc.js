var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const { kiemTraVaiTroDuocSi } = require('../Middleware/authenticate');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/Pagination' , Handle_Donthuoc.Select_Donthuoc);
router.post('/', Handle_Donthuoc.add_Donthuoc);
router.delete('/:id', Handle_Donthuoc.deleteDonthuoc);
router.put('/:id', Handle_Donthuoc.updateDonthuoc);
router.patch ('/Xacnhanthanhtoan/:ID_DonThuoc', Handle_Donthuoc.PaymentConfirmation);
router.get('/ChuaThanhToan', Handle_Donthuoc.Get_Not_Yet_Paid);
router.patch ('/XacNhanTrangThai/:ID' , Handle_Donthuoc.Status_handling);
// Đây là chức năng tìm kiếm của dược sĩ
router.get('/TimKiemCuaDS/Pagination', Handle_Donthuoc.SearchDS);


router.get('/DanhSachPhatThuoc' ,kiemTraVaiTroDuocSi, Handle_Donthuoc.Select_Status_Donthuoc);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10

router.get('/DanhSachPhatThuoc/Pagination' , Handle_Donthuoc.MedicineDistributionList_Pagination);


router.get('/LichSuPhatThuoc/Pagination' , Handle_Donthuoc.HistoryOfMedicineDispensing_Pagination);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10


router.get ('/Detail/:ID' , Handle_Donthuoc.Detail_Donthuoc); 
router.get ('/LayTheoPhieuKhamBenh/:ID' , Handle_Donthuoc.GET_Phieu_Kham_Benh);

   

module.exports = router;

      