var mongoose=require("mongoose");

module.exports=function(app){
	var repreconvention_Repre = mongoose.model('repreconvention_Repre', {
	    id: { type: Number, max: 99999, required: true, unique: true },
	    device: String,
	});
	return repreconvention_Repre;
}