module.exports = function(app){
	var fashionweek=app.controllers.fashionweek;
	app.get("/node/servicesctrl_dev/fashionweek/teste",fashionweek.teste);
	app.post("/node/servicesctrl_dev/fashionweek/create",fashionweek.fashionWeekCreate);
	app.post("/node/servicesctrl_dev/fashionweek/addmat",fashionweek.fashionWeekAddMateriais);
	app.post("/node/servicesctrl_dev/fashionweek/addemail",fashionweek.fashionWeekAddEmail);
	app.get("/node/servicesctrl_dev/fashionweek/list",fashionweek.fashionWeekList);
	app.post("/node/servicesctrl_dev/fashionweek/remove",fashionweek.fashionWeekRemove);
	app.get("/node/servicesctrl_dev/fashionweek/removeall",fashionweek.fashionWeekRemoveAll);
}