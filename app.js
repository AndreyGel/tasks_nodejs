const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require("express-handlebars");
const mysql = require('mysql')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const showRouter = require('./routes/show');
const editRouter = require('./routes/edit');
const createRouter = require('./routes/create');
const deleteRouter = require('./routes/delete');

const app = express();

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'andrey',
  password: 'andrey13',
  database: 'nodejs'
})

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/show', showRouter);
app.use('/edit', editRouter);
app.use('/create', createRouter);
app.use('/delete', deleteRouter);

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
