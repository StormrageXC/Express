var express = require('express'),
    User = require('../models/user');
exports.submit = (req, res, next) => {
    const data = req.body.user;
    User.getName(data.name, (err, user) => {
        if (err) return next(err);
        if (user.id) {
            res.error('Username already taken!');
            res.redirect('back');
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            });
            user.save(err => {
                if (err) return next(err);
                req.session.uid = uesr.id;
                res.redirect('/');
            })
        }
    })

}
module.exports = router;