var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const { kiemTraVaiTroDuocSi } = require('../Middleware/authenticate');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/Pagination' , Handle_Donthuoc.Select_Donthuoc);
router.post('/Add', Handle_Donthuoc.add_Donthuoc);
router.delete('/:id', Handle_Donthuoc.deleteDonthuoc);
router.put('/:id', Handle_Donthuoc.updateDonthuoc);

router.patch ('/ThayDoiTrangThai/:ID' , Handle_Donthuoc.ThayDoiTrangThai);

// Kiểm tra xem phiếu khám bệnh có đơn thuốc nào đang tạo không
router.get('/KiemTraDonThuocDangTao', Handle_Donthuoc.KiemTraDonThuocDangTao);

router.patch ('/Xacnhanthanhtoan/:ID_DonThuoc', Handle_Donthuoc.PaymentConfirmation);
router.get('/DonThuocThuNgan/Pagination', Handle_Donthuoc.Get_Not_Yet_Paid);
router.patch ('/XacNhanTrangThai/:ID' , Handle_Donthuoc.Status_handling);

router.get('/TimKiemTheoSDTHoacIdPhieuKhamBenh/Pagination', Handle_Donthuoc.TimKiemBenhNhanBangTenVaSDT);
  

router.get('/DanhSachPhatThuoc' , Handle_Donthuoc.Select_Status_Donthuoc);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10

router.get('/DanhSachPhatThuoc/Pagination' , Handle_Donthuoc.MedicineDistributionList_Pagination);


router.get('/LichSuPhatThuoc/Pagination' , Handle_Donthuoc.HistoryOfMedicineDispensing_Pagination);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10


router.get ('/Detail/:ID' , Handle_Donthuoc.Detail_Donthuoc); 
router.get ('/LayTheoPhieuKhamBenh/:ID' , Handle_Donthuoc.GET_Phieu_Kham_Benh);

// Lọc từ ngày đến ngày, Lọc theo năm
router.get('/filter-by-date', Handle_Donthuoc.Filter_Donthuoc_ByDate);

   

module.exports = router;

      