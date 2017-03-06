 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of general webServices.
* Access "Classes menu" to an overview
* @module GeneralController
*
*/


var mongoose=require("../config.js");

module.exports=function(app){
	var Repreconvention_Repre=app.models.repconvention;

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
		}
	};
	return GeneralController;
};