var mongoose=require("mongoose");

module.exports=function(app){
	var User = mongoose.model('User', {
	    id: { type: Number, max: 99999, required: true, unique: true },
	    device: String,
	    mail: Boolean,
	    materials: [{ id: String, qr: Boolean, fav: Boolean }]
	});
	return User;
}