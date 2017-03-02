module.exports = function(app){
	app.get("/node/servicesctrl_dev/repre_convention/teste",app.controllers.general.teste);
	app.get("/node/servicesctrl_dev/repre_convention/list",app.controllers.general.repreConventionList);
	app.post("/node/servicesctrl_dev/repre_convention/create",app.controllers.general.repreConventionCreate);
}