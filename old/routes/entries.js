var express = require('express');
var router = express.Router();
const Entry = require('../models/entry');
exports.form = (req, res) => {
    res.render('post', { title: 'POST' })
};
exports.submit = (req, res, next) => {
    const data = req.body.entry,
        user = res.locals.user,
        username = user ? user.name : null,
        entry = new Entry({
            username: username,
            title: data.title,
            body: data.body
        });
    entry.save(err => {
        if (err) return next(err);
        if (req.remoteUser) {
            res.json({ message: 'Entry added' })
        } else {
            res.redirect('/');
        }
    })
}
exports.form = (req, res) => {
    res.render('post', { title: 'POST' })
};
exports.list = (req, res, next) => {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) return next(err);
        res.render('entries', {
            title: 'Entries',
            entries: entries
        })
    })
};