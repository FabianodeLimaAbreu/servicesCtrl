 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of FashionWeek webServices.
* Access "Classes menu" to an overview
* @module FashionWeekController
*
*/

var mongoose=require("../config.js");

module.exports=function(app){
	var FashionUser=app.models.fashionuser;

	/**
	*Main application class, This class in a controllers of all funcionalities of FashionWeek webServices
	* @exports FashionWeekController
	* @constructor
	*/
	var FashionWeekController={
		teste:function(req,res){
			res.send("Strings FashionWeek");
		},
		fashionWeekList:function(req,res){
			FashionUser.find(function(err, users) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(users); // return all users in JSON format 
		    });
		},

		/**
		* fashionWeekCreate Method POST
		* @memberOf FashionWeekController#
		* @param {String} id - Receive "x" and generate a random id
		* @param {String} device - device been used by user
		* @param {String} category - the category of user
		* @param {String} ev - event happening
		* @param {Object} material - a list of materials if it exists
		* This create a new user and auto generate a create_date value in db..
		* This method can receive "material's list" (OPTIONAL), in this case, it will add material to an user that has been created.
		* @returns {Object} - The user that even exists in database or the created one.
		*/
		fashionWeekCreate: function(req, res) {
		    // create a FashionWeek_user, information comes from AJAX request
		    /*
			{
			"id":"x",
			"device":"Android",
			"category":"TI-WEB",
			"ev":"SPFW",
			"material":{
			        "id":"TESTE10",
			        "qr":false,
			        "fav":true
			    }
			}
		    */
		    var _id=req.body.id;
		    var material=req.body.material;
		    if(_id == "x"){
		        //Call a generateUserID Method
		        _id=parseInt(generateUserXId());
		    }
		    FashionUser.findOne({id:_id},function(err,user){
		        if(user){
		            res.json(ret);
		        }
		        else{
		            FashionUser.create({
		                id: _id,                           
					    device: req.body.device,
					    category: req.body.category,
					    ev: req.body.ev
		            },function(err,user){
		                if (err)
		                    res.send(err);

		                // get and return user after you create another
		                FashionUser.findOne({id:_id},function(err, result) {
		                    if (err)
		                        res.send(err)

		                    if(material){
		                        //If a material's list has been passed as param
		                        user.materials.push(material);
		                        user.save(function(err,result){
		                            res.json(result);
		                            return !0;
		                        });
		                    }
		                    else{
		                        res.json(user);
		                    }
		                });
		            })
		        }
		    });
		},
		/**
		* fashionWeekAddMateriais Method POST
		* @memberOf FashionWeekController#
		* @param {Int} id - id of user
		* @param {Object} materials - An object that has been fav or viewed by user.
		* This method find the user and its material's list by id received and verify by material's id if its exists. If true, just update , or add a new material
		* This method return the find user itself.
		*/
		fashionWeekAddMateriais: function(req, res) {
		    /*
		    {
		        "id":66266,
		        "materials":{
		            "id":"TESTE1",
		            "qr":true,
		            "fav":false
		        }
		    }
		    */
		    
		    var _materials = req.body.materials;
		    var id = req.body.id;

		    FashionUser.findOneAndUpdate(
		    {
		        "id": id
		    },
		    {
		    	"update_date":new Date()
		    },
		    {
		    	new: true
		    },
		    function(err,fashionuser){
		        if(fashionuser){
		            var i=0, length, edited=false;
		            var materials=fashionuser.materials;
		            length=materials.length;
		            while(i<=length){
		                if(i===length){
		                    if(!edited){
		                        //New element
		                        var mat=_materials;
		                        fashionuser.materials.push(mat);
		                        fashionuser.save(function(err,result){
		                            res.json(result);
		                            return !0;
		                        });
		                        return !0;
		                    }
		                }

		                if(fashionuser.materials[i].id === _materials.id){
		                    //Equal, then just change it - just fav
		                    fashionuser.materials[i].fav=_materials.fav;
		                    edited=true;
		                    fashionuser.save(function(err,result){
		                        res.json(result);
		                        return !0;
		                    })
		                    return !0;
		                }
		                i++;
		            }
		        }
		        else{
		            res.send(false);
		            return !0;
		        }
		    });

		},
		/**
		* fashionWeekAddEmail Method POST
		* @memberOf FashionWeekController#
		* @param {Int} id - id of user
		* @param {Array} materials - An Array of itens's id that has been sent by email by user.
		* This method find the user and its material's list by id received and verify by material's id if its exists. If true, just update , or add a new material
		* This method return the find user itself.
		*/
		fashionWeekAddEmail: function(req, res) {
		    /*
		    {
		        "id":1894904509,
		        "materials":{
		            "list":["PM1121JF","AF0021"]
		        }
		    }
		    */
		    
		    var _materials = req.body.materials;
		    var id = req.body.id;

		    FashionUser.findOneAndUpdate(
		    {
		        "id": id
		    },
		    {
		    	"update_date":new Date()
		    },
		    {
		    	new: true
		    },
		    function(err,fashionuser){
		        if(fashionuser){
		            var i=0, length, edited=false;

		            var mat=_materials;
                    //fashionuser.email.date=new Date();
                    fashionuser.email.push(mat);
                    fashionuser.save(function(err,result){
                        res.json(result);
                        return !0;
                    });
		            
		        }
		        else{
		            res.send(false);
		            return !0;
		        }
		    });

		},
		/**
		* Remove All Documents of User Collection
		* @memberOf QrAppController#
		* This method remove all documents from collection
		* This method return true / false.
		*/
		fashionWeekRemoveAll: function(req, res) {
		    FashionUser.remove({}, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},
		/**
		* Remove User Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* This method find a user by id passed as param and remove it
		* This method return true / false.
		*/
		fashionWeekRemove: function(req, res) {
		/*
		{
		    "id":"11111"
		}
		*/
		    FashionUser.remove({
		        id: req.body.id
		    }, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		}
		    
	}
	return FashionWeekController;
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function generateUserXId(){
    return Math.floor(Math.random() * (9999999999- 1000000000 + 1)) + 1000000000;
}