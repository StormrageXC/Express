const redis = require('redis'),
    bcrypt = require('bcrypt'),
    db = redis.createClient({ password: 921122 });
class User {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
        }
    }
    static getName(name, cb) {
        User.getId(name, (err, id) => {
            if (err) return cb(err);
            User.get(id, cb);
        })
    }
    static getId(name, cb) {
        db.get(`user:id:${name}`, cb);
    }
    static get(id, cb) {
        db.hgetall(`user:${id}`, (err, user) => {
            if (err) return cb(err);
            cb(null, new User(user));
        })
    }
    static auth(name, pass, cb) {
        User.getName(name, (err, user) => {
            if (err || !user.id) return cb(err || null);
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return cb(err);
                if (hash === user.pass) return cb(null, user);
                cb();
            })
        })
    }
    save(cb) {
        if (this.id) {
            this.update(cb);
        } else {
            db.incr('user:ids', (err, id) => {
                if (err) return cb(err);
                this.id = id;
                this.hashPassword((err) => {
                    if (err) return cb(err);
                    this.update(cb);
                })
            })
        }
    }
    update(cb) {
        const id = this.id;
        db.set(`user:id:${this.name}`, id, (err) => {
            if (err) return cb(err);
            db.hmset(`user:${id}`, this, (err) => {
                cb(err);
            })
        })
    }
    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err);
                this.pass = hash;
                cb();
            })
        })
    }
}
User.getName('tobi', (err, user) => {
    if (err) console.err(err);
    console.log(user);
});
// const user = new User({ name: 'example', pass: 'test' });
// user.save((err) => {
//     if (err) console.error(err);
//     console.log('user id %d', user.id);
// })
module.exports = User;