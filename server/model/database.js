'use strict';
var database = {}

var mongodb = require('mongodb');
var config = require('../config.json');
var dbref=null;

database.getdb = function(next){
	if(!dbref){
		mongodb.MongoClient.connect(config.dburl, function(err,db){
			if(err){
				console.log("Unable to connect to the database!!");
				next(err,null)
			} else {
				dbref = {
					db:db,
					user:db.collection('user'),
					user_role:db.collection('user_role')
				};
				db.collection('user').createIndex( {mobile:1}, { unique: true }, function(err){
					if(err)
						console.log("ERROR", "unable to create unique index hohohohoo");
				});
				next(null, dbref);
			}
		});
	} else {
		next(null,dbref);
	}
}
module.exports = database;