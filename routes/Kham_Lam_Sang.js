var express = require('express');
var router = express.Router();
const Loading_Controler_Kham_Lam_Sang = require ('../Controller/Kham_Lam_Sang');
const Handle_Kham_Lam_Sang = new Loading_Controler_Kham_Lam_Sang ();


router.get ('/' , Handle_Kham_Lam_Sang.Select_Kham_Lam_Sang);
router.post ('/Add' , Handle_Kham_Lam_Sang.Add_Kham_Lam_Sang);
router.put ('/Edit/:ID' , Handle_Kham_Lam_Sang.Edit_Kham_Lam_Sang);
router.delete ('/Delete/:ID' , Handle_Kham_Lam_Sang.Delete_Kham_Lam_Sang);
router.get ('/Detail/:ID' , Handle_Kham_Lam_Sang.Detail_Kham_Lam_Sang);
router.get ('/LayTheoPhieuKhamBenh/:ID' , Handle_Kham_Lam_Sang.GET_PhieuKhamBenh); 
router.get ('/LayTheoTheKhamBenh/Pagination/:ID' , Handle_Kham_Lam_Sang.GET_TheKhamBenh); 


module.exports = router;      