const express = require('express'),
    auth = require('basic-auth'),
    User = require('../models/user'),
    Entry = require('../models/entry');
exports.auth = (req, res, next) => {
    const { name, pass } = auth(req);
    User.auth(name, pass, (err, user) => {
        if (user) req.remoteUser = user;
        next(err);
    });
}
exports.user = (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user.id) return res.sendStatus(404);
        res.json(user.toJson());
    });
}
exports.entries = (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        // res.json(entries);
        res.format({
            xml: () => {
                // res.write(`<entries>\n`);
                // entries.forEach(entry => {
                //     res.write(`
                //     <entry>
                //     <title>${entry.title}</title>
                //     <body>${entry.body}</body>
                //     <username>${entry.username}</username>
                //     </entry>
                //     `)
                // });
                // res.end(`</entries>`);
                res.render('xml', { entries: entries })

            },
            json: () => {
                res.send(entries);
            }
        })
    })
}