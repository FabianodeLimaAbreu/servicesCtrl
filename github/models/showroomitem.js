var mongoose=require("mongoose");

module.exports=function(app){
	var Item = mongoose.model('Item', {
	    id: { type: Number, max: 99999999, required: true, unique: true },
	    origin: { type: String, required: true },
	    area: { type: String, required: true },
	    description: { type: String, required: true },
	    label: String,
	    owner: String,
	    season: String,
	    status: String,
	    images: [{ name: String, kind: String }],
	    materials: [{ MATNR: String, MAKTX: String }]
	});
	return Item;
}