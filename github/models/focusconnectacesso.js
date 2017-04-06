var mongoose=require("mongoose");

module.exports=function(app){
	var FocusConnect_Acesso = mongoose.model('FocusConnect_Acesso', {
	    name: String,
	    perfil:String,
	    date: {
	        type: Date,
	        default: Date.now
	    },
	    navigation: [
	    	{ 
	    		date: {type: Date, default: Date.now},
	    		item: String
	    	}
	    ]
	});
	return FocusConnect_Acesso;
}