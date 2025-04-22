var express = require('express');
var router = express.Router();
const Loaing_Controler_Benhnhan = require ('../Controller/Benh_nhan');
const Handle_Benhnhan = new Loaing_Controler_Benhnhan ();


router.get ('/' , Handle_Benhnhan.Select_Benhnhan);
router.post('/', Handle_Benhnhan.add_Benhnhan);
router.delete('/:id', Handle_Benhnhan.deleteBenhnhan);
router.put('/:id', Handle_Benhnhan.updateBenhnhan);

module.exports = router;  