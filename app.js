var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const entries = require('./routes/entries');
const register = require('./routes/register');
const login = require('./routes/login');
const validate = require('./middleware/validate');
const message = require('./middleware/message');
const user = require('./middleware/user');
const api = require('./routes/api');
const page = require('./middleware/page');
const Entry = require('./models/entry');


var app = express();
app.locals.email = 'me@myapp.com'
    // view engine setup
    // app.set('views', path.join(__dirname, 'views'));
console.log(app.get('views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);
app.use(message);


app.get('/', entries.list);
app.get('/post', entries.form);
app.post('/post', validate.require('entry[title]'), validate.lengthAbove('entry[title]', 4), entries.submit);

app.get('/register', register.form);
app.post('/register', register.submit);

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.get('/api/user/:id', api.user);
app.post('/api/entry', entries.submit);
app.get('/api/entries/:page?', page(Entry.count), api.entries);

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