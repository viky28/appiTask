let config = require("../config.json");
let product = require("../model/product");
let router = {};

router.createCategory = function(req, res) {
    let ip = req.body.params;
    if (!ip.categoryId || !ip.categoryName) {
        res.status(200).send(JSON.stringify({ status: "error", "msg": "All conditions not met" }))
        return;
    } else {
        product.createCategory(ip, function(err, comment) {
            if (err) {
                res.status(200).send(JSON.stringify({ status: "error", "msg": "Already exists" }))
            } else {
                res.send(JSON.stringify({ status: "success", result: comment }));
            }
        })
    }
}
router.createProduct = function(req, res) {
    let ip = req.body.params;
    if (!ip.categoryId || !ip.productName || !ip.productId || !ip.productDesc) {
        res.status(200).send(JSON.stringify({ status: "error", "msg": "All conditions not met" }))
        return;
    } else {
        product.createProduct(ip, function(err, comment) {
            if (err) {
                res.status(200).send(JSON.stringify({ status: "error", "msg": "Already exists" }))
            } else {
                res.send(JSON.stringify({ status: "success", result: comment }));
            }
        })
    }
}
router.deleteCategory = function(req, res) {
    let ip = req.body.params;
    if (!ip.categoryId) {
        res.status(200).send(JSON.stringify({ status: "error", "msg": "All conditions not met" }))
        return;
    } else {
        product.deleteCategory(ip, function(err, comment) {
            if (err) {
                res.status(200).send(JSON.stringify({ status: "error", "msg": "Already exists" }))
            } else {
                res.send(JSON.stringify({ status: "success", result: comment }));
            }
        })
    }
}
// router.getCategoryWithProducts = function(req, res) {
//     let ip = req.body;
//     if (!ip) {
//         res.status(200).send(JSON.stringify({ status: "error", "msg": "All conditions not met" }))
//         return;
//     } else {
//         product.getCategoryWithProducts(ip, function(err, comment) {
//             if (err) {
//                 res.status(200).send(JSON.stringify({ status: "error", "msg": "Already exists" }))
//             } else {
//                 res.send(JSON.stringify({ status: "success", result: comment }));
//             }
//         })
//     }
// }
module.exports = router;