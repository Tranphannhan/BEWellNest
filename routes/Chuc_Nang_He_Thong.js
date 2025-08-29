var express = require('express');
var router = express.Router();
const Chuc_Nang_Controller = require ('../Controller/Chuc_Nang_He_Thong');
const { kiemTraVaiTroQuanTriVien } = require('../Middleware/authenticate');
const Handle_ChucNang = new Chuc_Nang_Controller ();

router.get ('/' ,kiemTraVaiTroQuanTriVien, Handle_ChucNang.GetChucNang);
router.patch('/Update/:id',kiemTraVaiTroQuanTriVien, Handle_ChucNang.UpdateChucNang);
module.exports = router;

   