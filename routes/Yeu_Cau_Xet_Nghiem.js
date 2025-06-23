var express = require('express');
var router = express.Router();
const Loading_Controler_Yeucauxetnghiem = require ('../Controller/Yeu_Cau_Xet_Nghiem');
const Handle_Yeucauxetnghiem = new Loading_Controler_Yeucauxetnghiem ();

// load Yêu cầu theo Id_PhieuKhamBenh (Huân)
// Lấy Detail
router.get ('/' , Handle_Yeucauxetnghiem.Select_Yeucauxetnghiem);
router.post ('/Add' , Handle_Yeucauxetnghiem.Add_Yeucauxetnghiem);
router.put ('/Edit/:ID' , Handle_Yeucauxetnghiem.Edit_Yeucauxetnghiem);
router.delete ('/Delete/:ID' , Handle_Yeucauxetnghiem.Delete_Yeucauxetnghiem);
   

// dùng để load yêu cầu xét nghiệp chưa xét nghiệp hoặc đã xét nghiệm
router.get('/GetById_PhongTB_date/Pagination', Handle_Yeucauxetnghiem.Get_ById_PTB_Date);
router.patch ('/Xacnhanthanhtoan/:ID_YeuCauXetNghiem', Handle_Yeucauxetnghiem.PaymentConfirmation);
router.get('/YeuCauXetNghiemThuNgan/Pagination', Handle_Yeucauxetnghiem.Get_Not_Yet_Paid);
router.get('/YeuCauXetNghiemThuNgan/Detail', Handle_Yeucauxetnghiem.Get_Not_yet_paid_Detail);
router.patch ('/XacNhanTrangThai/:ID' , Handle_Yeucauxetnghiem.Status_handling);
router.get ('/Detail/:ID' , Handle_Yeucauxetnghiem.Detail);
router.get ('/LayTheoPhieuKhamBenh/:ID' , Handle_Yeucauxetnghiem.GET_LayTheoPhieuKhamBenh);
router.patch ('/ThayDoiTrangThaiHoatDong/:ID' , Handle_Yeucauxetnghiem.Boquatrangthaihoatdong);
router.get ('/TimKiemTheoSDTHoacIdPhieuKhamBenh/Pagination', Handle_Yeucauxetnghiem.TimKiemBenhNhanBangSDTHoacIdTheKhamBenh);

// Thống kê doanh thu
router.get('/filter-by-date', Handle_Yeucauxetnghiem.Filter_Yeucauxetnghiem_ByDate);

   
module.exports = router;     
    