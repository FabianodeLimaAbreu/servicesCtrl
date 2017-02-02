//require("./models/usuarios")

var express=require("express");
var app=express();
var url = require('url');
var request = require("request");
var routes=require("./routes");
//var mongoose=require("mongoose");
// mongoose.connect("mongodb://189.126.197.169/app");

app.use(app.router);
app.get("/node/servicesctrl/teste",routes.teste);

/*app.get('/node/app/teste', function(req,res,next){
 
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
  });

   res.end('Cheguei');
});*/
app.listen(process.env.PORT);