var express = require('express');
exports.form = (req, res) => {
    res.render('login', { title: 'Login' })
};