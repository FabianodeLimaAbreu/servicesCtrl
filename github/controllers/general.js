 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of general webServices.
* Access "Classes menu" to an overview
* @module GeneralController
*
*/


var mongoose=require("../config.js");

module.exports=function(app){
	var repreconvention_Repre=app.models.repreconvention_Repre;

	/**
	* Annual Sales Convention Class Controller.
	* @exports GeneralController
	* @constructor
	*/
	var GeneralController={
		testeConvencao:function(req,res){
			res.send("Strings TESTE");
		},
		testeConvencao2:function(req,res){
			res.send("Strings 2");
		}	
	};
	return GeneralController;
};