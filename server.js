var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/**
 * Define custom modules after dotenv is required
 */
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var mongooseConnect = require('./config/mongoose-connect');
var logger = require('./config/logger');

/* path setup */
var users = require('./routes/users');
var messages = require('./routes/messages');

/* express initialization */
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('combined', { 'stream': logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('super secret'));
app.use(express.static(path.join(__dirname, 'dist')));


app.use(session({
  cookie: {
    maxAge: 60000
  },
	secret: 'super secret',
	resave: false,
	saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongooseConnect
  })
}));

// login validator
// app.all('*', checkLogin);

app.use('/users', users);
app.use('/messages', messages);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error message
  res.status(err.status || 500);
  res.send('error');
});

/* custom login middleware */
function checkLogin(req, res, next) {
  if ((req.session && req.session.userId) || req.path == '/') {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = app;
