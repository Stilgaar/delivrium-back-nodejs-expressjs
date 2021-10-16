var createError = require('http-errors');
var express = require('express');
var path = require('path');

// CORS : obligatoire npm i cors (faut l'app.use après)
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// pour utiliser les .env faut également l'installer et faut également le lancer
// sauf qu'il ne faut pas faire d'app.use
require('dotenv').config()
require('./db.js')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts')

var app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// nos deux routes, on a viré celle de l'index, parce que bha parce que quoi
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// on a viré pas mal d'erreur 404 de l'app d'ici parce que ça faisait bugger le back && le front.
// s'il n'y a pas de problèmes il n'y a pas de solutions
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
 // next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
})

  module.exports = app;
