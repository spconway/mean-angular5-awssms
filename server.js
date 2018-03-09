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
var api = require('./routes/api');

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.set('trust proxy', 1);

// login validator
app.all('*', loginRequired);

app.use('/api', api);

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

function loginRequired(req, res, next) {
  if (req.path === '/api/messages') {
    if (!req.token) {
      return res.status(401).json({
        message: 'Unauthorized user!',
        redirectTo: '/login'
      });
    }
  }
  next();
}

module.exports = app;
