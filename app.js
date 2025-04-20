var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/Bac_Si');
let indexRouter_Benhnhan = require ('./routes/Benh_nhan'); 
let indexRouter_Cakham = require ('./routes/Ca_kham');
let indexRouter_Donthuoc = require ('./routes/Don_Thuoc');
let indexRouter_Donthuoc_Chitiet = require ('./routes/Don_Thuoc_Chi_Tiet');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use ('/Benhnhan' , indexRouter_Benhnhan);
app.use ('/Cakham' , indexRouter_Cakham);
app.use ('/Donthuoc' , indexRouter_Donthuoc);
app.use ('/Donthuoc_Chitiet' , indexRouter_Donthuoc_Chitiet);
 







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
