var mongoose=require("mongoose"),
Schema=mongoose.Schema;

var usuario=new Schema({
	nome:{type:String , required:true,
			index:{unique:true}}
});

mongoose.model("usuarios",usuario);