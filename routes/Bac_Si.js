var express = require('express');
var router = express.Router();
const Loaing_Controler_Bacsi = require ('../Controller/Bac_Si');
const Handle_Bac_Si = new Loaing_Controler_Bacsi();

router.get ('/' , Handle_Bac_Si.Select_Bacsi);
router.post('/',Handle_Bac_Si.add_Bacsi)
router.delete('/:id', Handle_Bac_Si.deleteBacSi); 
router.put('/:id', Handle_Bac_Si.updateBacSi);


module.exports = router;   