 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of Showroom's app webServices.
* Access "Classes menu" to an overview
* @module ShowRoom
*
*/

var mongoose=require("../config.js");

var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { fileSize: 1000 * 1000 * 2.5 } });

module.exports=function(app){
	var Item=app.models.showroomitem;
	var Loan=app.models.showroomloan;

	var form = "<!DOCTYPE HTML><html><body>" +"<form method='post' id='uploadForm' action='/node/servicesctrl_dev/showroom/upload' enctype='multipart/form-data'>" +"<input type='text' name='name'/>" +"<input type='file' name='file'/>" +"<input type=submit value='Upload Image' name='submit'></form>" +"</body></html>";
	/**
	*Main application class, This class in a controllers of all funcionalities of Showroom's app webServices
	* @exports ShowRoom
	* @constructor
	*/
	var ShowRoom={
		teste:function(req,res){
			res.send("Strings Uploader");
		},

		//ITENS

		/**
		* ListItens Method GET
		* @memberOf ShowRoom#
		* Return a list of itens from database
		*/
		listItens:function(req,res){
			Item.find(function(err, itens) {
				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(itens); // return all users in JSON format
		    });
		},

		/**
		* InsertIten Method POST
		* @memberOf ShowRoom#
		* @param {Int} id - id of Item
		* @param {String} origin - Where item is
		* @param {String} area - Department
		* @param {String} label - Label itself
		* @param {String} Owner - Owner itself
		* @param {String} Season - Season it belongs
		* @param {String} Status - Status right now
		* @param {Object} images - a list of images if it exists
		* @param {Object} material - a list of materials if it exists
		* This method use findOneAndUpdate, then it the item exists update it and return it.
		* This method can receive "material's list" and "image's list" (OPTIONAL), in this case, it will add a list to item when it is created or updated.
		*/
		insertItem:function(req,res){
			/*
				{
					"id": 11,
				    "origin": "Origin",
				    "area": "masculino",
				    "description": "item inserindo",
				    "label": "Charmuse",
				    "owner": "Rose",
				    "season": "111221",
				    "status": "ATIVO",
				    "images": [{
							        "name":"TESTE12",
							        "kind":"jeadns"
							    },
							    {
							        "name":"TESTE0",
							        "kind":"jeadns"
							    }
							  ],
				    "materials": {
							        "MATNR":"P21JF",
							        "MAKTX":"PRODUTO PRODUTO"
							    }
				}
			*/
			var query = { id: req.body.id },
	        options = { upsert: true, new: true, setDefaultsOnInsert: true };

		    Item.findOneAndUpdate(query, {
		        origin: req.body.origin,
		        area: req.body.area,
		        description: req.body.description,
		        label: req.body.label,
		        owner: req.body.owner,
		        season: req.body.season,
		        status: req.body.status,
		        images: req.body.images,
		        materials: req.body.materials
		    }, options, function(err, item) {
		        if (err)
		            res.send(err);

		        Item.find(function(err, itens) {
		            if (err)
		                res.send(err)
		            res.json(itens);
		        });
		    });
		},

		/**
		* Remove Item Method POST
		* @memberOf ShowRoom#
		* @param {Int} id - id of item
		* This method find a item by id passed as param and remove it
		* This method return the item itself
		*/
		removeItem:function(req,res){
			/*
				{
					"id":11
				}
			*/
			Item.findOneAndRemove({ id: req.body.id }, function(err, item) {
		        if (err) throw err;
		        res.json(item);
		    });
		},


		//LOAN


		/**
		* ListLoan Method GET
		* @memberOf ShowRoom#
		* Return a list of loans from database
		*/
		listLoan:function(req,res){
			Loan.find(function(err, loans) {
		        if (err)
		            res.send(err)

		        res.json(loans);
		    });
		},

		/**
		* InsertIten Method POST
		* @memberOf ShowRoom#
		* @param {Int} id - id of Item
		* @param {String} name - Item's name
		* @param {String} position - To be defined
		* @param {String} clerk - To be defined
		* @param {Date} finish - The finish's date
		* @param {String} type - Loan's type
		* @param {Boolean} active - To set it as active or not
		* @param {Object} itens - a list of itens if it exists
		* @param {String} obs - a note if its necessary
		* This method use findOneAndUpdate, then if the loan exists update it and return it.
		* This method can receive "itens's list" (OPTIONAL), in this case, it will add a list to item when it is created or updated.
		*/
		insertLoan:function(req,res){
			/*
				{
					"id": 13341,
					"name": "Teste",
				    "position": "Position",
				    "clerk": "Tetstando",
				    "finish": "12/12/2012",
				    "type": "Tipo",
				    "active": true,
				    "itens": [
				    			{
				    				"id":"1111",
				    				"condition":"Teste",
				    				"returned": false
				    			}
				    		 ],
				    "obs": "Obs"
				}
			*/
			var query = { _id: req.body.id },
	        options = { upsert: true, new: true, setDefaultsOnInsert: true };

		    Loan.findOneAndUpdate(query, {
		        name: req.body.name,
		        position: req.body.position,
		        clerk: req.body.clerk,
		        start: req.body.start,
		        finish: req.body.finish,
		        type: req.body.type,
		        active: req.body.active,
		        itens: req.body.itens,
		        obs: req.body.obs
		    }, options, function(err, loan) {
		        if (err)
		            res.send(err);

		        Loan.find(function(err, loans) {
		            if (err)
		                res.send(err)
		            res.json(loans);
		        });
		    });
		},

		/**
		* Remove Item Method POST
		* @memberOf ShowRoom#
		* @param {Int} id - id of item
		* This method find a item by id passed as param and remove it
		* This method return the item itself
		*/
		removeLoan:function(req,res){
			Loan.findOneAndRemove({ _id: req.params.id }, function(err, loan) {
		        if (err) throw err;
		        res.json(loan);
		    });
		},

		

		callForm:function(req,res){
			res.writeHead(200, { 'Content-Type': 'text/html' });
		    res.end(form);
		},


		// IMAGES
		uploadImage:function(req,res){
			sharp(req.file.buffer)
	        .resize(800)
	        .background('white')
	        .jpeg()
	        .toFile('./uploads/' + req.body.name + '.jpg', function(err) {
	            if (err) {
	                return res.json({ errors: true, message: "Error uploading file."});
	            }
	            return res.json({ errors: false, message: "Succeeded"});
	        });
		},
		uploadsFile:function(req,res){
			//http://189.126.197.169/node/servicesctrl_dev/showroom/uploads/ok.jpg
			file = req.params.file;
		    var img = fs.readFileSync("./uploads/" + file);
		    res.writeHead(200, { 'Content-Type': 'image/jpg' });
		    res.end(img, 'binary');
		},
		uploads:function(req,res){
			fs.readdir("./uploads", function(err, files) {
		        if (err) {
		            console.log('error');//"Error uploading file."
		            return res.end(err);
		        }
		        res.json(files);
		    });
		},
		deleteImg:function(req,res){
			/*
				{
					"url":"imagename.jpg"
				}
			*/
			var file = req.body.url;
		    var path = "./uploads/" + file;
		    var exist = fs.existsSync(path);

		    if (!exist)
		        return res.json({ errors: true, message: "File does not exist."});

		    fs.unlink(path, function(err) {
		        if (err) {
		            console.log('error');
		            return res.json({ errors: true, message: "Error deleting file."});
		        }
		        return res.json({ errors: false, message: "Succeeded"});
		    });
		},
		deleteAllImg:function(req,res){
			/*
				{
					"list":[
							  "33w",
							  "Teste"
							]
				}
			*/
			var files = req.body.list;
		    var idx = 0;

		    deleteImage(files[idx]);

		    function deleteImage(file) {
		        var path = "./uploads/" + file + ".jpg";
		        var exist = fs.existsSync(path);

		        if (!exist)
		            return res.json({ errors: true, message: "File does not exist."});

		        fs.unlink(path, function(err) {
		            if (err) {
		                return res.json({ errors: true, message: "Error deleting file " + file + "."});
		            }
		            if(idx < files.length - 1){
		                idx++;
		                deleteImage(files[idx]);
		            }
		            return res.json({ errors: false, message: "Succeeded"});
		        });
		    }
		}



	}
	return ShowRoom;
};