const app = require('connect');

function a(req, res, next) {
    console.log('1', x);
    next();
}

function b(req, res, next) {
    console.log('2');
    res.end('hello world');
    next();
}

function c(err, req, res, next) {
    console.log('3');
    res.setHeader('Content-Type', 'text/plain');
    res.end('hello world');
}
app().use(a).use(b).use(c).listen(8080);