var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* add package */
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let guruRouter = require('./routes/guru');
let matpelRouter = require('./routes/mata_pelajaran')
let tahunRouter = require('./routes/tahun')
let kelasRouter = require('./routes/kelas')
let ekstraRouter = require('./routes/ekstra')
let siswaRouter = require('./routes/siswa')
let setKelasRouter = require('./routes/set_kelas')
let setMataPelajaranRouter = require('./routes/set_mata_pelajaran')
let setWaliKelasRouter = require('./routes/set_wali_kelas')

// guru
let adminGuruRouter = require('./routes/admin_guru');

// siswa
let adminSiswaRouter = require('./routes/admin_siswa');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
app.use(session({ secret: 'keyboard cat', cookie: {} }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.locals.stuff = {
    url: req.originalUrl
  }
  next();
});

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', guruRouter);
app.use('/', matpelRouter);
app.use('/', tahunRouter);
app.use('/', kelasRouter);
app.use('/', ekstraRouter);
app.use('/', siswaRouter);
app.use('/', setKelasRouter);
app.use('/', setMataPelajaranRouter);
app.use('/', setWaliKelasRouter);
app.use('/', adminGuruRouter);
app.use('/', adminSiswaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
