var mongoose=require("mongoose");

module.exports=function(app){
	var Repreconvention_Repre = mongoose.model('Repreconvention_Repre', {
	    id: { type: Number, required: true, unique: true },
	    name: { type: String, required: true },
	    email: { type: String, required: true },
	    ddd: { type: Number, required: true },
	    tel: { type: String, required: true },
	    repre: { type: String, required: true },
	    from: [{ where: String, comp: String}],
	    transport: { type: String, required: true }
	});
	return Repreconvention_Repre;
}