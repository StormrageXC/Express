var express = require('express');
exports.form = (req, res) => {
    res.render('register', { title: 'Register' })
};