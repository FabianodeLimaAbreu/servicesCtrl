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
		* criEvent2017Insert Method POST
		* @memberOf GeneralController#
		* @param {Int} cod - Client's cpnj
		* @param {String} name - Client's name
		* @param {String} cargo - Cargo (Department)
		* @param {String} representante - Representant (Department)
		* @param {String} email - Client's email
		* @param {Array Object} segments - Client's action segments (select by client): segments.segtype and segments.segval.
		* @param {Array Object} participants - max 3. Same values as Client.
		* This method can receive "participants's list" (OPTIONAL), in this case, it will add a list of participants to client when it is created.
		*/
		criEvent2017Insert:function(req,res){
			/*
				{
					"cod": 6605675826,
					"codigo": 7777777777,
					"razao": "Fabiano S.A",
					"representante": "Fabiano de Lima",
				    "name": "Fabiano",
				    "cargo": "masculino",
				    "email": "fabianoabreu@focustextil.com.br",
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
					    	"pcodigo": 41829933300,
							"prazao": "Pernambucanas",
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
							"pcodigo": 41829933300,
							"prazao": "Pernambucanas",
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

			var query = { cod: req.body.cod },
	        options = { upsert: true, new: true, setDefaultsOnInsert: true };

		    CriEvent_User.findOneAndUpdate(query, {
		    	codigo: req.body.codigo,
		    	razao: req.body.razao,
		    	representante: req.body.representante,
		        name: req.body.name,
		        cargo: req.body.cargo,
		        email: req.body.email,
		        segments: req.body.segments,
		        participants: req.body.participants
		    }, options, function(err, item) {
		        if (err)
		            res.send(err);

		        res.json(item);
		    });
		},
		
		criEvent2017List:function(req,res){
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/list
			CriEvent_User.find().sort({"date": 'desc'}).exec(function(err, client) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(client); // return all repres in JSON format 
		    });
		},

		/**
		* Find Client Method POST
		* @memberOf QrAppController#
		* @param {Int} cod - Client's cod
		* This method find a client by cod passed as param
		*This method return the find client itself.
		*/
		criEvent2017FindUserByCod: function(req, res) {
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/find/:cod
		    CriEvent_User.find({
		        cod: req.params.cod
		    }, function(err, client) {
		        if (err)
		            res.send(err);

		        res.json(client);
		    });
		},

		/**
		* Remove All Documents of Client Collection
		* @memberOf GeneralController#
		* @param {Object} res - Response
		* This method remove all documents from collection
		* This method return true / false.
		*/
		criEvent2017RemoveAll: function(req, res) {
			//http://189.126.197.169/node/servicesctrl_dev/cri_event/removeall
		    CriEvent_User.remove({}, function(err, client) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},


		/**
		* Remove Client Method POST
		* @memberOf GeneralController#
		* @param {String} name - name of user
		* This method find a client by name passed as param and remove it all
		* This method return true / false.
		*/
		criEvent2017Remove: function(req, res) {
		//http://189.126.197.169/node/servicesctrl_dev/cri_event/remove
		/*
		{
		    "cod":321321
		}
		*/
		    CriEvent_User.remove({
		        cod: req.body.cod
		    }, function(err, client) {
		        if (err)
		            res.send(err);

		        res.send(client);
		    });
		},

	};
	return GeneralController;
};