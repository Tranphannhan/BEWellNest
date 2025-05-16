var express = require('express');
var router = express.Router();
const Loaing_Controler_Bacsi = require ('../Controller/Bac_Si');
const Handle_Bac_Si = new Loaing_Controler_Bacsi();
const Upload  = require ('../Middleware/upload');


router.get ('/' , Handle_Bac_Si.Select_Bacsi);
router.post('/Add',  Upload.Upload_Image__.single("Image") , Handle_Bac_Si.add_Bacsi)
router.put('/Edit/:id', Upload.Upload_Image__.single("Image") , Handle_Bac_Si.updateBacSi);
router.delete('/:id', Handle_Bac_Si.deleteBacSi);

  
module.exports = router;        