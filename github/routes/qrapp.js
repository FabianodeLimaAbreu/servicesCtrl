module.exports = function(app){
	var qrapp=app.controllers.qrapp;
	app.get("/node/servicesctrl_dev/teste",qrapp.teste);
	app.get("/node/servicesctrl_dev/list",qrapp.list);
	app.post('/node/node-mongo-focus/create',qrapp.create);
	app.post("/node/node-mongo-focus/editemail",qrapp.editemail);
	app.post('/node/node-mongo-focus/add',qrapp.add);
	app.get('/node/node-mongo-focus/find/:id',qrapp.findUserById);
	app.post('/node/node-mongo-focus/remove',qrapp.remove);
	app.get('/node/node-mongo-focus/data',qrapp.data);
}