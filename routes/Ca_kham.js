var express = require('express');
var router = express.Router();
const Loaing_Controler_Cakham = require ('../Controller/Ca_kham');
const Handle_Cakham = new Loaing_Controler_Cakham ();


router.get ('/LayTheoKhoa/Pagination/:ID' , Handle_Cakham.Get_ByKhoa);
router.get ('/LayTheoKhoaVaLoaiCa/Pagination/:ID' , Handle_Cakham.Get_ByKhoa);
router.get ('/Pagination' , Handle_Cakham.Select_Cakham); 
router.post('/Add', Handle_Cakham.add_Cakham);
router.delete('/:id', Handle_Cakham.deleteCakham);
router.put('/:id', Handle_Cakham.updateCakham);
router.get ('/SoLuongDangKham/:ID_CaKham' , Handle_Cakham.Get_Count_Cakham);
module.exports = router;  