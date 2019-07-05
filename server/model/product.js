let config = require("../config.json");
let Sequence = require('sequence').Sequence;
let _ = require('underscore');
let database = require("./database");
let ObjectId = require('mongodb').ObjectID;

exports.createCategory = function(p, cb) {
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
            p.createdate = new Date();
            db.category.save(p, function(er, re) {
                if (er || !re) {
                    cb("ERROR", null)
                } else {
                    cb(er, re)
                }
            })
        })
}

exports.createProduct = function(p, cb) {
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
            p.createdate = new Date();
            db.product.save(p, function(er, re) {
                if (er || !re) {
                    cb("ERROR", null)
                } else {
                    next(re.ops[0].productId)
                }
            })
        })
        .then(function(next, pid) {
            p.updatedate = new Date();
            db.category.findAndModify({ categoryId: p.categoryId }, {}, { $addToSet: { products: pid } }, { new: true }, function(err, res) {
                if (err || !res) {
                    cb("ERROR", null)
                } else {
                    cb(err, res)
                }
            })
        })
}
// exports.getCategoryWithProducts = function(p, cb) {
//     var db;
//     var seq = Sequence.create();
//     seq
//         .then(function(next) {
//             database.getdb(function(err, dbref) {
//                 if (err) {
//                     console.log("ERROR", "unable to connect to DB");
//                     process.exit(1);
//                 } else {
//                     db = dbref;
//                     next();
//                 }
//             })
//         })
//         .then(function(next) {
//             db.category.find().toArray(function(er, re) {
//                 if (er || !re) {
//                     cb("ERROR", null)
//                 } else {
//                     console.log("ids are ", re)
//                     // cb(er,re)
//                     next(re)
//                 }
//             })
//         })
//         .then(function(next, res) {
//             let catList = [];
//             let productList = [];
//             _.each(res, function(v, k) {
//                 db.product.find({ _id: { $in: v.products } }, function(e, r) {
//                     if (e || !r) {
//                         cb("ERROR", null)
//                     } else {
//                         console.log("coming here !",r)
//                         // cb(e, r)
//                     }
//                 })
//                 // _.each(v.products, function(v1, k1) {
//                 // 	db.product.findOne({ _id: ObjectId(v1) }, function(e, r) {
//                 // 		if (e || !r) {
//                 // 			cb("ERROR", null)
//                 // 		} else {
//                 // 			productList.push(r);
//                 // 			cb(e, r)
//                 // 		}
//                 // 	})
//                 // })
//             })
//             console.log("productList", productList)
//         })
// }
exports.deleteCategory = function(p, cb) {
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
            db.category.findOne({ categoryId: p.categoryId }, function(er, re) {
                if (er || !re) {
                    cb("ERROR", null)
                } else {
                    console.log("ids are ", re.products)
                    next(re.products)
                }
            })
        })
        .then(function(next, products) {
            db.category.remove({ categoryId: p.categoryId }, function(err, res) {
                if (err || !res) {
                    cb("ERROR", null)
                } else {
                    for (let i = 0; i < products.length; i++) {
                        db.product.remove({ _id: ObjectId(products[i]) }, function(e, r) {
                            if (e || !r) {
                                cb("ERROR", null)
                            } else {
                                cb(e, r)
                            }
                        })
                    }
                }
            })
        })
}