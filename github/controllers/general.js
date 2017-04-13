 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of general webServices.
* Access "Classes menu" to an overview
* @module GeneralController
*
*/


var mongoose=require("../config.js");

module.exports=function(app){
	var Repreconvention_Repre=app.models.repconvention;
	var FocusConnectAcesso=app.models.focusconnectacesso;
	var CriEvent_User=app.models.crievent;

	/**
	* Main application class, This class in a controllers of all funcionalities of general webServices.
	* @exports GeneralController
	* @constructor
	*/
	var GeneralController={
		teste:function(req,res){
			res.send("Strings TESTE");
		},

		/**
		* repreConventionCreate Method POST
		* @memberOf GeneralController#
		* @param {int} id - id of repre
		* @param {String} name - Repre's name
		* @param {String} email - Repre's email
		* @param {int} ddd - Repre's ddd phone number
		* @param {String} tel - Repre's phone number as String format
		* @param {String} repre - Representation's name
		* @param {Object} from - Where repre comes from...
		* @param {String} transport - Repre's transport type (plane, bus, car)
		* This method receive params as post and look for this id in database, if it isn`t exist, create a new one and return it
		* @returns {Object} - The repre that even exists in database or the created one.
		*/
		repreConventionCreate: function(req, res) {
		    // create a Repreconvention_Repre, information comes from AJAX request
		    /*
		    {
			    "id":"11113",
			    "name":"Fabiano",
				"email":"teste@teste.com.br",
				"ddd":11,
				"repre":"Teste",
				"tel":"96622-5892",
				"from" : {
							"where":"interior",
							"comp":"Sorocaba"
					
						} ,
				"transport":"aviao"
			}
		    */
		    var _id=req.body.id;
		    Repreconvention_Repre.findOne({id:_id},function(err,repre){
		        if(repre){
		        	var ret={
					    "id":"0"
					}
		            res.json(ret);
		        }
		        else{
		            Repreconvention_Repre.create({
		                id: _id,
					    name: req.body.name,
					    email: req.body.email,
					    ddd: req.body.ddd,
					    tel: req.body.tel,
					    repre: req.body.repre,
					    from: req.body.from,
					    transport: req.body.transport
		            },function(err,repre){
		                if (err)
		                    res.send(err);

		                res.json(repre);
		            })
		        }
		    });
		},
		repreConventionList:function(req,res){
			Repreconvention_Repre.find(function(err, repres) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(repres); // return all repres in JSON format 
		    });
		},

		//FOCUSCONNECT
		testeconnect:function(req,res){
			res.send("Strings TESTE CONNECT");
		},
		focusConnectList:function(req,res){
			FocusConnectAcesso.find().sort({"date": 'desc'}).exec(function(err, acesso) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(acesso); // return all repres in JSON format 
		    });
		},
		/**
		* focusConnectInsert Method POST
		* @memberOf GeneralController#
		* @param {String} name - User's name
		* @param {String} perfil - User's email
		* This method receive User's info as params and create an new access on database
		* @returns {Object} - The user's access created.
		*/
		focusConnectInsert: function(req, res) {
		    // information comes from AJAX request
		    /*
		    {
			    "name":"Fabiano",
				"perfil":"GESTOR"
			}
		    */
		    FocusConnectAcesso.create({
			    name: req.body.name,
			    perfil: req.body.perfil,
            },function(err,acesso){
                if (err)
                    res.send(err);

                res.json(acesso);
            })
		},

		/**
		* focusConnectInsertAddNavigation Method POST
		* @memberOf GeneralController#
		* @param {String} name - user's name
		* @param {Object} navigation - An object of an element that has been viewed by user.
		* This method is called everytime that an user select one of itens on site. Then this method select a list of access of this user, select the last one to add an navigation
		* @returns {Object} - The user's access itself.
		*/
		focusConnectInsertAddNavigation: function(req, res) {
		    /*
		    {
			    "name":"Fabiano",
			    "navigation":{
			        "item":"TESTE1"
			    }
			}
		    */
		    
		    var _navigation = req.body.navigation;
		    var _name = req.body.name;

 			FocusConnectAcesso.findOne({"name":_name}).sort({"date":-1}).exec(function(err, acesso) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        if(acesso){
		        	var nav=_navigation;
		        	acesso.navigation.push(nav);
		        	acesso.save(function(err,result){
                        res.json(result);
                        return !0;
                    });
		        }
		        else{
		        	res.send(false);
		        }
		    });


		},

		/**
		* Remove All Documents of User Collection
		* @memberOf GeneralController#
		* @param {Object} res - Response
		* This method remove all documents from collection
		* This method return true / false.
		*/
		focusConnectRemoveAll: function(req, res) {
		    FocusConnectAcesso.remove({}, function(err, acesso) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},

		/**
		* Remove User Method POST
		* @memberOf GeneralController#
		* @param {String} name - name of user
		* This method find a user by name passed as param and remove it all
		* This method return true / false.
		*/
		focusConnectRemove: function(req, res) {
		/*
		{
		    "name":"TIWEB"
		}
		*/
		    FocusConnectAcesso.remove({
		        name: req.body.name
		    }, function(err, acesso) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},

		//FOCUSCONNECT
		testecri:function(req,res){
			res.send("Teste CRICIUMA");
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
		criEvent2017Insert:function(req,res){
			/*
				{
					"id": 423443342,
				    "name": "Origin",
				    "cargo": "masculino",
				    "email": "item inserindo",
				    "segments": [
					    {
					        "segtype":"select",
					        "segval":"jeadns"
					    },
					    {
					        "segtype":"select",
					        "segval":"TESTANDO"
					    }
					],
					"participants": [
					    {
					        "pname": "Origin1",
						    "pcargo": "masculino1",
						    "pemail": "item inserindo1",
						    "psegments": [
							    {
							        "segtype":"select",
							        "segval":"jeaddsasdns"
							    },
							    {
							        "segtype":"select",
							        "segval":"TESTAdddddNDO"
							    }
							]
					    },
						{
					        "pname": "Origin2",
						    "pcargo": "masculino2",
						    "pemail": "item inserindo2",
						    "psegments": [
							    {
							        "segtype":"select",
							        "segval":"jeaddsasdns"
							    },
							    {
							        "segtype":"select",
							        "segval":"TESTAdddddNDO"
							    }
							]
					    }
					]
				}
			*/

		    CriEvent_User.create({
		    	id: req.body.id,
		        name: req.body.name,
		        cargo: req.body.cargo,
		        email: req.body.email,
		        segments: req.body.segments,
		        participants: req.body.participants
		    }, function(err, item) {
		        if (err)
		            res.send(err);

		        res.json(item);
		    });
		},
		
		criEvent2017List:function(req,res){
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/list
			CriEvent_User.find().sort({"date": 'desc'}).exec(function(err, user) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(user); // return all repres in JSON format 
		    });
		},

		/**
		* Find User Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* This method find a user by id passed as param
		*This method return the find user itself.
		*/
		criEvent2017FindUserById: function(req, res) {
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/find/:id
		    CriEvent_User.find({
		        id: req.params.id
		    }, function(err, user) {
		        if (err)
		            res.send(err);

		        res.json(user);
		    });
		},

		/**
		* Remove All Documents of User Collection
		* @memberOf GeneralController#
		* @param {Object} res - Response
		* This method remove all documents from collection
		* This method return true / false.
		*/
		criEvent2017RemoveAll: function(req, res) {
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/removeall
		    CriEvent_User.remove({}, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},


		/**
		* Remove User Method POST
		* @memberOf GeneralController#
		* @param {String} name - name of user
		* This method find a user by name passed as param and remove it all
		* This method return true / false.
		*/
		criEvent2017Remove: function(req, res) {
		//http://189.126.197.169/node/servicesctrl_dev/cri_event/remove
		/*
		{
		    "id":321321
		}
		*/
		    CriEvent_User.remove({
		        id: req.body.id
		    }, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},

	};
	return GeneralController;
};