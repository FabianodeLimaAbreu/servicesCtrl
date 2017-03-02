 /**
*@fileOverview Main application class, This class in a controllers of all funcionalities of qrApp webServices.
* Access "Classes menu" to an overview
* @module QrAppController
*
*/

var mongoose=require("../config.js");

module.exports=function(app){
	var User=app.models.user;

	/**
	*Main application class, This class in a controllers of all funcionalities of qrApp webServices
	* @exports QrAppController
	* @constructor
	*/
	var QrAppController={
		teste:function(req,res){
			res.send("Strings");
		},
		list:function(req,res){
			User.find(function(err, users) {
		        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		        if (err)
		            res.send(err)

		        res.json(users); // return all users in JSON format 
		    });
		},
		/**
		* CreateUser Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* @param {String} device - device been used by user
		* @param {boolean} mail - if user has email
		* This method receive threee params. Use the id to return a user in the base or create a new user with this id and return it, add the device value in an attribute, and the mail also.
		* This method can receive "material's list" (OPTIONAL), in this case, it will add material to an user that has been created.
		* If recieve "X" in :id param, generate a random id starting by 6
		*/
		create: function(req, res) {
		    // create a User, information comes from AJAX request from Angular
		    /*
		    {
			    "id":"11113",
			    "name":"Fabiano",
				"email":"teste@teste.com.br",
				"ddd":11,
				"tel":"96622-5892",
				"from":{
							"where":"interior",
							"comp":"Sorocaba"
					
						},
				"transport":"aviao"
			}
		    */
		    var _id=req.body.id;
		    var material=req.body.material;
		    if(_id == "x"){
		        //Call a generateUserID Method
		        _id=parseInt("6"+generateUserXId());
		    }
		    User.findOne({id:_id},function(err,user){
		        if(user){
		            res.json(user);
		        }
		        else{
		            User.create({
		                id: _id,
		                device:req.body.device || "mobile",
		                mail:req.body.mail || false
		            },function(err,user){
		                if (err)
		                    res.send(err);

		                // get and return user after you create another
		                User.findOne({id:_id},function(err, result) {
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
		* Edit Email Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* @param {boolean} mail - if user has email
		* This method edit a user by it's id, changing mail attribute and return the object itself.
		*/
		editemail:function(req,res){
		/*
		{
		    "id":"11111",
		    "mail":true
		}
		*/
		    var _id=req.body.id;
		    var mail=req.body.mail;
		    User.update({id:_id},{mail:mail},function(err,user){
		        if(err)
		            res.send(err);

		        res.json(user);
		    })
		},
		/**
		* AddMateriais Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* @param {Object} material - An object that has been fav or viewed by user.
		* This method find the user and its material's list by id received and verify by material's id if its exists. If true, just update , or add a new material
		*This method return the find user itself.
		*/
		add: function(req, res) {
		    //66266
		    /*
		    {
		        "id":66266,
		        "material":{
		            "id":"TESTE1",
		            "qr":true,
		            "fav":false
		        }\
		    }
		    */
		    
		    var _material = req.body.material;
		    var id = req.body.id;

		    User.findOne({
		        "id": id
		    },function(err,user){
		        if(user){
		            var i=0, length, edited=false;
		            var materials=user.materials;
		            length=materials.length;
		            while(i<=length){
		                if(i===length){
		                    if(!edited){
		                        //New element
		                        var mat=_material;
		                        user.materials.push(mat);
		                        user.save(function(err,result){
		                            res.json(result);
		                            return !0;
		                        });
		                        return !0;
		                    }
		                }

		                if(user.materials[i].id === _material.id){
		                    //Equal, then just change it - just fav
		                    user.materials[i].fav=_material.fav;
		                    edited=true;
		                    user.save(function(err,result){
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
		* Find User Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* This method find a user by id passed as param
		*This method return the find user itself.
		*/
		findUserById: function(req, res) {
		    User.find({
		        id: req.params.id
		    }, function(err, user) {
		        if (err)
		            res.send(err);

		        res.json(user);
		    });
		},
		/**
		* Remove User Method POST
		* @memberOf QrAppController#
		* @param {Int} id - id of user
		* This method find a user by id passed as param and remove it
		* This method return true / false.
		*/
		remove: function(req, res) {
		/*
		{
		    "id":"11111"
		}
		*/
		    User.remove({
		        id: req.body.id
		    }, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},
		/**
		* Remove All Documents of User Collection
		* @memberOf QrAppController#
		* This method remove all documents from collection
		* This method return true / false.
		*/
		removeAll: function(req, res) {
		    User.remove({}, function(err, user) {
		        if (err)
		            res.send(err);

		        res.send(true);
		    });
		},
		//res.setHeader('Content-Type', 'application/json');
		//
		data: function(request, response) {
		    response.setHeader('Content-Type', 'application/json');
		    // response.send(materials);
		}/*,

		crypto: function(request, response) {
		    teste.encrypt()
		}
*/


	}
	return QrAppController;
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
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
}