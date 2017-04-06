var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000 * 1000 * 8 } });

module.exports = function(app){
	var showroom=app.controllers.showroom;
	app.get("/node/servicesctrl_dev/showroom/teste",showroom.teste);

	app.get("/node/servicesctrl_dev/showroom/list_itens",showroom.listItens);
	app.post("/node/servicesctrl_dev/showroom/insert_item",showroom.insertItem);
	app.post("/node/servicesctrl_dev/showroom/remove_item",showroom.removeItem);

	app.get("/node/servicesctrl_dev/showroom/list_loan",showroom.listLoan);
	app.post("/node/servicesctrl_dev/showroom/insert_loan",showroom.insertLoan);
	app.post("/node/servicesctrl_dev/showroom/remove_loan/:id",showroom.removeLoan);

	app.get('/node/servicesctrl_dev/showroom/call', showroom.callForm);
	app.post('/node/servicesctrl_dev/showroom/upload', upload.single('file'),showroom.uploadImage);
	app.get('/node/servicesctrl_dev/showroom/uploads/:file', showroom.uploadsFile);
	app.get('/node/servicesctrl_dev/showroom/uploads', showroom.uploads);
	app.post('/node/servicesctrl_dev/showroom/delete_img', showroom.deleteImg);
	app.post('/node/servicesctrl_dev/showroom/delete_all', showroom.deleteAllImg);
}