var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/app");

exports.teste=function(req,res,next){
	res.send("Strixzng");
}