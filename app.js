const createError = require('http-errors');
const express = require('express');
const path = require('path');

// CORS : obligatoire npm i cors (faut l'app.use après)
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// pour utiliser les .env faut également l'installer et faut également le lancer
// sauf qu'il ne faut pas faire d'app.use
require('dotenv').config()
require('./db.js')

// var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentRouter = require('./routes/comment')

const app = express();

// view engine setup
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// nos trois routes, on a viré celle de l'index, parce que bha parce que quoi
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter)

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
