module.exports = function(app){
	//Repre_Convertion
	app.get("/node/servicesctrl_dev/repre_convention/teste",app.controllers.general.teste);
	app.get("/node/servicesctrl_dev/repre_convention/list",app.controllers.general.repreConventionList);
	app.post("/node/servicesctrl_dev/repre_convention/create",app.controllers.general.repreConventionCreate);

	//FocusConnect
	app.get("/node/servicesctrl_dev/focusconnect/teste",app.controllers.general.testeconnect);
	app.get("/node/servicesctrl_dev/focusconnect/list",app.controllers.general.focusConnectList);
	app.post("/node/servicesctrl_dev/focusconnect/insert",app.controllers.general.focusConnectInsert);
	app.post("/node/servicesctrl_dev/focusconnect/addnav",app.controllers.general.focusConnectInsertAddNavigation);
	app.post("/node/servicesctrl_dev/focusconnect/remove",app.controllers.general.focusConnectRemove);
	app.get("/node/servicesctrl_dev/focusconnect/removeall",app.controllers.general.focusConnectRemoveAll);
}