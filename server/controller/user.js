let config  = require("../config.json");
let user = require("../model/user");
let router={};

router.register = function(req, res) {

	let ip = req.body.params;
	if(!ip.email || !ip.mobile || !ip.password){
		res.status(200).send(JSON.stringify({status:"error", "msg":"All conditions not met"}))
		return;
	}
	user.register(ip, function(err,cbresult){
		if(err){
			res.status(200).send(JSON.stringify({status:"error", "msg":"Some issue with your data"}))
		} else {
			res.send(JSON.stringify({status:"success", result: cbresult}));
		}
	})
}

module.exports = router