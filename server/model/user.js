let config  = require("../config.json");
let Sequence = require('sequence').Sequence;
let _ = require('underscore');
let database = require("./database");
let ObjectId = require('mongodb').ObjectID;

exports.register = function(p,cb){
	var db;
	var seq = Sequence.create();
	seq
	.then(function(next){
		database.getdb(function(err,dbref){
			if(err){
				console.log("ERROR", "unable to connect to DB");
				process.exit(1);
			} else {
				db=dbref;
				next();
			}
		})
	})
	// .then(function(next){
	// 	db.user.find(function(err,res){
	// 		console.log("err and null ",err,res)
	// 		if(err || !res){
	// 			cb("ERROR",null)
	// 		} else {
	// 			cb(err,res)
	// 		}
	// 	})
	// })
	.then(function(next){
		p.saveTime = new Date();
		db.user.save(p, function(er,re){
			if(er || !re){
				cb("ERROR",null)
			} else {
				cb(er,re)
			}
		})
	})
}