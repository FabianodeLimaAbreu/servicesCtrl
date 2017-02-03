module.exports = function(app){
	var qrapp=app.controllers.qrapp;
	app.get("/node/servicesctrl_dev/teste",qrapp.teste);
	app.get("/node/servicesctrl_dev/list",qrapp.list);
	app.post('/node/node-mongo-focus/create',qrapp.create);
	
}