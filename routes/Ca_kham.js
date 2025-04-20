var express = require('express');
var router = express.Router();
const Loaing_Controler_Cakham = require ('../Controller/Ca_kham');
const Handle_Cakham = new Loaing_Controler_Cakham ();

router.get ('/' , Handle_Cakham.Runviews);
router.get ('/Select' , Handle_Cakham.Select_Cakham);

module.exports = router;  