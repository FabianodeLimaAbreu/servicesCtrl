var mongoose=require("mongoose");

module.exports=function(app){
	var FashionUser = mongoose.model('FashionUser', {
	    id: { type: Number, max: 9999999999, required: true, unique: true },
	    device: String,
	    category:String,
	    ev:String, //evento
	    create_date: {
	        type: Date,
	        default: Date.now
	    },
	    update_date: {
	        type: Date
	    },
	    email: [
	    	{ 
	    		date: {type: Date, default: Date.now},
	    		list: Array,
	    	}
	    ],
	    materials: [{ id: String, qr: Boolean, fav: Boolean }]
	});
	return FashionUser;
}