const session = require('express-session');
const cookieParser = require('cookie-parser');

const sessionMiddleware = session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false , // 
        maxAge: 86400000}
});

module.exports = [
    cookieParser(), 
    sessionMiddleware
];
