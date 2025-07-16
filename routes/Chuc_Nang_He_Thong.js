var express = require('express');
var router = express.Router();
const Chuc_Nang_Controller = require ('../Controller/Chuc_Nang_He_Thong');
const Handle_ChucNang = new Chuc_Nang_Controller ();

router.get ('/' , Handle_ChucNang.GetChucNang);
module.exports = router;

   