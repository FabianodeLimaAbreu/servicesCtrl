var mongoose=require("mongoose");

module.exports=function(app){
	var CriEvent_User = mongoose.model('CriEvent_User', {
		cnpj: { type: Number, max: 99999999999, required: true, unique: true },
	    name: { type: String, required: true },
	    cargo:{ type: String, required: true },
	    email:{ type: String, required: true },
	    date: {
	        type: Date,
	        default: Date.now
	    },
	    segments: [
	    	{ 
	    		segtype:String, //check or other
	    		segval: String
	    	}
	    ],
	    participants: [
	    	{ 
	    		pname: String,
			    pcargo: String,
			    pemail: String,
			    psegments: [
			    	{ 
			    		segtype:String, //check or other
			    		segval: String
			    	}
			    ]
	    	}
	    ],
	});
	return CriEvent_User;
}