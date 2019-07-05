let config = require("../config.json");
let Sequence = require('sequence').Sequence;
let _ = require('underscore');
let database = require("./database");
let ObjectId = require('mongodb').ObjectID;

exports.register = function(p, cb) {
    var db;
    var seq = Sequence.create();
    seq
        .then(function(next) {
            database.getdb(function(err, dbref) {
                if (err) {
                    console.log("ERROR", "unable to connect to DB");
                    process.exit(1);
                } else {
                    db = dbref;
                    next();
                }
            })
        })
        .then(function(next) {
            db.user.find().toArray(function(err, res) {
                if (err || !res) {
                    cb("ERROR", null)
                } else {
                    next(res)
                }
            })
        })
        .then(function(next, res) {
            console.log('res---', res.length)
            if (res.length == 0) {
                db.user_role.save({ "name": p.name, "email": p.email, "user_role": "Admin", saveTime: new Date() }, function(er, re) {
                    if (er || !re) {
                        cb("ERROR", null)
                    } else {
                        next()
                    }
                })
            } else {
                db.user_role.save({ "name": p.name, "email": p.email, "user_role": "User", saveTime: new Date() }, function(er, re) {
                    if (er || !re) {
                        cb("ERROR", null)
                    } else {
                        next()
                    }
                })
            }
        })
        .then(function(next) {
            p.saveTime = new Date();
            db.user.save(p, function(e, r) {
                if (e || !r) {
                    cb("ERROR", null)
                } else {
                    cb(e, r)
                }
            })
        })
}