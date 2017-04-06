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
		* repreConventionCreate Method POST
		* @memberOf GeneralController#
		* @param {int} userid - id of user acessing
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
		focusConnectInsert: function(req, res) {
		    // create a Repreconvention_Repre, information comes from AJAX request
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
		* fashionWeekAddMateriais Method POST
		* @memberOf FashionWeekController#
		* @param {Int} id - id of user
		* @param {Object} materials - An object that has been fav or viewed by user.
		* This method find the user and its material's list by id received and verify by material's id if its exists. If true, just update , or add a new material
		* This method return the find user itself.
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
		* @memberOf QrAppController#
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
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* This method find a user by id passed as param and remove it
		* This method return true / false.
		*/
		focusConnectRemove: function(req, res) {
		/*
		{
		    "userid":"11111"
		}
		*/
		    FocusConnectAcesso.remove({
		        userid: req.body.userid
		    }, function(err, acesso) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		}

	};
	return GeneralController;
};