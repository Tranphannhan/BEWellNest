var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const { kiemTraVaiTroDuocSi, kiemTraVaiTroBacSi, kiemTraVaiTroQuanTriVien, kiemTraVaiTroThuNgan } = require('../Middleware/authenticate');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/Pagination', kiemTraVaiTroDuocSi, Handle_Donthuoc.Select_Donthuoc);
router.post('/Add', kiemTraVaiTroBacSi, Handle_Donthuoc.add_Donthuoc);
router.delete('/:id',kiemTraVaiTroQuanTriVien, Handle_Donthuoc.deleteDonthuoc);
router.put('/:id',kiemTraVaiTroQuanTriVien, Handle_Donthuoc.updateDonthuoc);

router.patch ('/ThayDoiTrangThai/:ID' ,kiemTraVaiTroDuocSi, Handle_Donthuoc.ThayDoiTrangThai);

// Kiểm tra xem phiếu khám bệnh có đơn thuốc nào đang tạo không
router.get('/KiemTraDonThuocDangTao',kiemTraVaiTroBacSi, Handle_Donthuoc.KiemTraDonThuocDangTao);

router.patch ('/Xacnhanthanhtoan/:ID_DonThuoc',kiemTraVaiTroThuNgan, Handle_Donthuoc.PaymentConfirmation);
router.get('/DonThuocThuNgan/Pagination',kiemTraVaiTroThuNgan, Handle_Donthuoc.Get_Not_Yet_Paid);
router.patch ('/XacNhanTrangThai/:ID' , kiemTraVaiTroDuocSi, Handle_Donthuoc.Status_handling);

router.get('/TimKiemTheoSDTHoacIdPhieuKhamBenh/Pagination', kiemTraVaiTroDuocSi, Handle_Donthuoc.TimKiemBenhNhanBangTenVaSDT);
  

router.get('/DanhSachPhatThuoc' , kiemTraVaiTroDuocSi, Handle_Donthuoc.Select_Status_Donthuoc);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10

router.get('/DanhSachPhatThuoc/Pagination' , kiemTraVaiTroDuocSi, Handle_Donthuoc.MedicineDistributionList_Pagination);


router.get('/LichSuPhatThuoc/Pagination' , kiemTraVaiTroDuocSi, Handle_Donthuoc.HistoryOfMedicineDispensing_Pagination);
//http://localhost:5000/Donthuoc/DanhSachPhatThuoc?date=2025-05-10


router.get ('/Detail/:ID' , kiemTraVaiTroDuocSi, Handle_Donthuoc.Detail_Donthuoc); 
router.get ('/LayTheoPhieuKhamBenh/:ID' , kiemTraVaiTroDuocSi, Handle_Donthuoc.GET_Phieu_Kham_Benh);

// Lọc từ ngày đến ngày, Lọc theo năm
router.get('/filter-by-date', kiemTraVaiTroDuocSi, Handle_Donthuoc.Filter_Donthuoc_ByDate);

   

module.exports = router;

      