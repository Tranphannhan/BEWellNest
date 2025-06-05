var express = require('express');
var router = express.Router();
const Loading_Controler_Phieu_Kham_Benh = require ('../Controller/Phieu_Kham_Benh');
const Handle_Phieu_Kham_Benh = new Loading_Controler_Phieu_Kham_Benh ();
     

router.get ('/' , Handle_Phieu_Kham_Benh.Select_Phieukhambenh);
router.post ('/Add' , Handle_Phieu_Kham_Benh.Add_Phieukhambenh);
router.put ('/Edit/:ID' , Handle_Phieu_Kham_Benh.Edit_Phieukhambenh);
router.delete ('/Delete/:ID' , Handle_Phieu_Kham_Benh.Delete_Phieukham);
router.patch ('/Xacnhanthanhtoan/:Id_PhieuKhamBenh', Handle_Phieu_Kham_Benh.PaymentConfirmation);

// Dùng để hiển thị danh sách bệnh nhân: Đã khám, chưa khám, đã bỏ qua, đang xét nghiệm. Theo từng Ca (Chức năng của bác sĩ)
router.get ('/GetById_CaKham_Date/Pagination' , Handle_Phieu_Kham_Benh.Fill_Cakhambenh);
router.get('/PhieuKhamBenhThuNgan/Pagination', Handle_Phieu_Kham_Benh.Get_Not_Yet_Paid); 
router.patch ('/XacNhanTrangThai/:ID' , Handle_Phieu_Kham_Benh.Status_handling);
router.get ('/Detail/:ID' , Handle_Phieu_Kham_Benh.Detail_Phieukham); 
router.get ('/LayTheoTheKhamBenh/:ID' , Handle_Phieu_Kham_Benh.GET_LayTheoTheKhamBenh);


// sửa lại API này
// router.patch ('/BoQuaPhieuKham/:ID?TrangThaiHoatDong="Kham/XetNghiem/BoQua' , Handle_Phieu_Kham_Benh.BoQuaPhieuKham);
router.patch ('/ThayDoiTrangThaiHoatDong/:ID' , Handle_Phieu_Kham_Benh.BoQuaPhieuKham); 
router.get ('/TimKiemTheoSDTHoacIdPhieuKhamBenh/Pagination', Handle_Phieu_Kham_Benh.TimKiemBenhNhanBangSDTHoacIdTheKhamBenh);

       
    

module.exports = router;           