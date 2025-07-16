var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 

  

var indexRouter_Bacsi = require('./routes/Bac_Si');
let indexRouter_Donthuoc = require ('./routes/Don_Thuoc');
let indexRouter_Donthuoc_Chitiet = require ('./routes/Don_Thuoc_Chi_Tiet');
let indexRouter_Phieu_Kham_Benh = require ('./routes/Phieu_Kham_Benh');
let indexRouter_The_Kham_Benh = require ('./routes/The_Kham_Benh');
let indexRouter_Yeu_Cau_Xet_Nghiem = require ('./routes/Yeu_Cau_Xet_Nghiem');
let indexRouter_Ket_Qua_Xet_Nghiem = require ('./routes/Ket_Qua_Xet_Nghiem');
let indexRouter_Kham_Lam_Sang= require ('./routes/Kham_Lam_Sang');
let indexRouter_Tai_Khoan= require ('./routes/Tai_Khoan');
let indexRouter_Loai_Tai_Khoan = require ('./routes/Loai_Tai_Khoan');
let indexRouter_Khoa= require ('./routes/Khoa');
let indexRouter_Phong_Kham= require ('./routes/Phong_Kham');
let indexRouter_Phong_Thiet_Bi= require ('./routes/Phong_Thiet_Bi');
let indexRouter_Thuoc = require ('./routes/Thuoc');
let indexRouter_Hoadon = require ('./routes/Hoadon');
let indexRouter_Nhom_thuoc = require ('./routes/Nhom_Thuoc');
let indexRouter_Giadichvu = require ('./routes/Gia_Dich_Vu');
let indexRouter_Loai_Xet_Nghiem = require ('./routes/Loai_Xet_Nghiem');
let indexRouter_Chi_Tiet_Kham_Lam_Sang = require ('./routes/Chi_Tiet_Kham_Lam_Sang');
let indexRouter_Chi_So_Sinh_Ton = require ('./routes/Chi_So_Sinh_Ton');
let indexRouter_Chuc_Nang_He_Thong = require ('./routes/Chuc_Nang_He_Thong');
let indexRouter_MoMo = require ('./routes/momo');
  


 
var app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Bắt buộc phải có để xử lý preflight



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use ('/Bacsi', indexRouter_Bacsi);
app.use ('/Donthuoc' , indexRouter_Donthuoc);
app.use ('/Donthuoc_Chitiet' , indexRouter_Donthuoc_Chitiet);
app.use ('/Phieu_Kham_Benh' , indexRouter_Phieu_Kham_Benh);
app.use ('/The_Kham_Benh' , indexRouter_The_Kham_Benh);
app.use ('/Yeu_Cau_Xet_Nghiem' , indexRouter_Yeu_Cau_Xet_Nghiem);
app.use ('/Ket_Qua_Xet_Nghiem' , indexRouter_Ket_Qua_Xet_Nghiem);
app.use ('/Kham_Lam_Sang' , indexRouter_Kham_Lam_Sang);
app.use ('/Tai_Khoan' , indexRouter_Tai_Khoan);
app.use ('/Loai_Tai_Khoan' , indexRouter_Loai_Tai_Khoan);
app.use ('/Khoa' , indexRouter_Khoa);
app.use ('/Phong_Kham' , indexRouter_Phong_Kham);
app.use ('/Phong_Thiet_Bi' , indexRouter_Phong_Thiet_Bi);
app.use ('/Thuoc' , indexRouter_Thuoc);
app.use ('/Hoadon' , indexRouter_Hoadon);
app.use ('/Nhomthuoc' , indexRouter_Nhom_thuoc);
app.use ('/Giadichvu' , indexRouter_Giadichvu);
app.use ('/Loaixetnghiem' , indexRouter_Loai_Xet_Nghiem);
app.use ('/Chi_Tiet_Kham_Lam_Sang' , indexRouter_Chi_Tiet_Kham_Lam_Sang);
app.use ('/Chi_So_Sinh_Ton' , indexRouter_Chi_So_Sinh_Ton);
app.use ('/Chuc_Nang_He_Thong' , indexRouter_Chuc_Nang_He_Thong);
app.use ('/PaymentMoMo' , indexRouter_MoMo);


    

  




   






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
