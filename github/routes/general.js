var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000 * 1000 * 8 } });

module.exports = function(app){
	app.get('/node/servicesctrl_dev/callform', app.controllers.general.callForm);

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

	//Criciuma Event
	app.get("/node/servicesctrl_dev/cri_event/teste",app.controllers.general.testecri);
	app.post("/node/servicesctrl_dev/cri_event/insert",app.controllers.general.criEvent2017Insert);
	app.get("/node/servicesctrl_dev/cri_event/list",app.controllers.general.criEvent2017List);
	app.get('/node/servicesctrl_dev/cri_event/find/:cod',app.controllers.general.criEvent2017FindUserByCod);
	app.post("/node/servicesctrl_dev/cri_event/remove",app.controllers.general.criEvent2017Remove);
	app.get("/node/servicesctrl_dev/cri_event/removeall",app.controllers.general.criEvent2017RemoveAll);

	//Focus Design Visions
	app.get("/node/servicesctrl_dev/designvisions/teste",app.controllers.general.testeDesignVisions);
	app.post("/node/servicesctrl_dev/designvisions/insert",app.controllers.general.designVisionsInsert);
	app.get("/node/servicesctrl_dev/designvisions/list",app.controllers.general.designVisionsList);
	app.post("/node/servicesctrl_dev/designvisions/remove",app.controllers.general.designVisionsRemove);
	app.get("/node/servicesctrl_dev/designvisions/removeall",app.controllers.general.designVisionsRemoveAll);
	
	app.post('/node/servicesctrl_dev/designvisions/upload', upload.single('file'),app.controllers.general.institutoForm2017UploadFile);

}