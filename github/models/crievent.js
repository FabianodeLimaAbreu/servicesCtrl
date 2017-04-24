var mongoose=require("mongoose");

module.exports=function(app){
	var CriEvent_User = mongoose.model('CriEvent_User', {
		cod: { type: Number, max: 99999999999, required: true, unique: true },
		codigo: { type: Number, max: 99999999999, required: true, unique: true },
		razao: { type: String, required: true },
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
	    		pcodigo: { type: Number, max: 99999999999},
				prazao: { type: String},
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