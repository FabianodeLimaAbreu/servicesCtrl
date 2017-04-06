	//require("./models/usuarios")

	var express=require("express")
		,url = require('url')
		,request = require("request")
		,load=require("express-load")
		,app=express()
		,mongoose=require("mongoose")
		,bodyParser = require('body-parser')
		,methodOverride = require('method-override')
		,cors=require("cors")
	;

	app.set('port', (process.env.PORT || 5000));
	app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
	app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); // parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());
	app.use(cors());

	load("models")
		.then("controllers")
		.then("routes")
		.into(app);


	app.listen(process.env.PORT);	