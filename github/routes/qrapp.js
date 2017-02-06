module.exports = function(app){
	var qrapp=app.controllers.qrapp;
	app.get("/node/servicesctrl_dev/teste",qrapp.teste);
	app.get("/node/servicesctrl_dev/list",qrapp.list);
	app.post('/node/servicesctrl_dev/create',qrapp.create);
	app.post("/node/servicesctrl_dev/editemail",qrapp.editemail);
	app.post('/node/servicesctrl_dev/add',qrapp.add);
	app.get('/node/servicesctrl_dev/find/:id',qrapp.findUserById);
	app.post('/node/servicesctrl_dev/remove',qrapp.remove);
	app.get('/node/servicesctrl_dev/data',qrapp.data);
	app.get('/node/servicesctrl_dev/removeall',qrapp.removeAll);
}