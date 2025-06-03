var express = require('express');
var router = express.Router();
const Loading_Controler_The_Kham_Benh = require ('../Controller/The_Kham_Benh');
const Handle_The_Kham_Benh = new Loading_Controler_The_Kham_Benh ();


router.get ('/Pagination' , Handle_The_Kham_Benh.Select_Thekhambenh);
router.post ('/Add' , Handle_The_Kham_Benh.Add_Thekhambenh);
router.put ('/Edit/:ID' , Handle_The_Kham_Benh.Edit_Thekhambenh);
router.delete ('/Delete/:ID' , Handle_The_Kham_Benh.Delete_Phieukham);
router.get ('/Detail/:ID' , Handle_The_Kham_Benh.Detail_Phieukham);
module.exports = router;      