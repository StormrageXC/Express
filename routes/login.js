var express = require('express');
User = require('../models/user');
exports.form = (req, res) => {
    res.render('login', { title: 'Login' })
};
exports.submit = (req, res, next) => {
    const data = req.body.user;
    User.auth(data.name, data.pass, (err, user) => {
        if (err) return next(err);
        if (user.id) {
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.error('invalid credentials!');
            res.redirect('back');
        }
    })
}
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/');
    })
};