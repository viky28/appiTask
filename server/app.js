let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let config  = require("./config.json");
let user = require("./controller/user");
let product = require("./controller/product");

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({}));
app.use('/public', express.static(path.join(__dirname, '../web/public')))

app.use(function(req, res, next) {
    if(req.body){
        console.log("[INPUT]:",req.url, JSON.stringify(req.body));
        var end = res.end;
        res.end = function(chunk, encoding){
            res.end = end;
            if (chunk) {
                console.log("[OUTPUT]:",req.url, chunk.toString('utf8'));
            }
            res.end(chunk, encoding);
        };
        next();

    }
});

app.post('/app', function (req, res, next) {
    console.log("coming inside app")
    if(!req.body.cmd){
        res.status(404).send("")
        return;
    }
    var cmd=req.body.cmd;
    if(user[cmd]){
        user[cmd](req,res)
    } else if(product[cmd]){
        product[cmd](req,res)
    } else {
        res.status(404).send("def");
    }
})


app.listen(3001, function(){
	console.log("Server listening at 3001");
})