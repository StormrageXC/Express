const redis = require('redis'),
    db = redis.createClient({ password: 921122 });
class Entry {
    constructor(jobs) {
        for (const key in jobs) {
            this[key] = jobs[key];
        }
    }
    save(cb) {
        const entryJSON = JSON.stringify(this);
        db.lpush(
            'entries',
            entryJSON,
            (err) => {
                if (err) return cb(err);
                cb();
            }
        )
    }
    static getRange(from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return cb(err);
            let entries = [];
            items.forEach(item => {
                entries.push(JSON.parse(item));
            });
            cb(null, entries);
        })
    }
    static count(cb) {
        Entry.getRange(0, -1, (err, entries) => {
            if (err) return cb(err);
            cb(err, entries.length);
        })
    }
}
module.exports = Entry;