var express = require('express');
var router = express.Router();
const Loading_Controler_Donthuoc = require ('../Controller/Don_Thuoc');
const Handle_Donthuoc = new Loading_Controler_Donthuoc ();

router.get ('/' , Handle_Donthuoc.Select_Donthuoc);
router.post('/', Handle_Donthuoc.add_Donthuoc);
router.delete('/:id', Handle_Donthuoc.deleteDonthuoc);
router.put('/:id', Handle_Donthuoc.updateDonthuoc);

router.get ('/Xacnhanthanhtoan/:ID_Phieukhambenh', Handle_Donthuoc.Check_Status);
module.exports = router;

    