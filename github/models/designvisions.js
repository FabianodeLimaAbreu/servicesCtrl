var mongoose=require("mongoose");

module.exports=function(app){
	var DesignVisions_User = mongoose.model('DesignVisions_User', {
		razao: { type: String, required: true },
	    nome: { type: String, required: true },
	    cargo:{ type: String, required: true },
	    tel: { type: Number, required: true },
	    email:{ type: String, required: true, unique: true},
	    curso: { type: String, required: true },
	    semestre: { type: Number, max: 99, required: true },
	    descr: { type: String, required: true },
	    born_date: {type: Date, required: true},
	    create_date: {
	        type: Date,
	        default: Date.now
	    },
	    midias: [
	    	{ 
	    		mtype:String,
	    		link: String
	    	}
	    ]
	});
	return DesignVisions_User;
}