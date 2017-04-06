var mongoose=require("mongoose");

module.exports=function(app){
	var Loan = mongoose.model('Loan', {
		_id: Number,
	    name: { type: String, required: true },
	    position: String,
	    clerk: { type: String, required: true },
	    start: { type: Date, default: Date.now },
	    finish: { type: Date, required: true },
	    type: { type: String, required: true },
	    active: Boolean,
	    itens: [{ id: String, condition: String, returned: Boolean }],
	    obs: String
	});
	return Loan;
}