var v = require('validator');

module.exports = {

	List: function(req,res) {
		User.findOne().where({'id':req.session.userid}).exec(function(err,result1){
			if(err){
				console.log(err);
			}else{
				User.find().where({'parent_id':req.session.userid, 'delete_status':'0'}).exec(function(err,result){
					var data={};
					data.list = result;
					data.list1 = result1;
					res.locals.layout = 'layout1.ejs';
	        return res.view('User/list.ejs',data);
    		})
			}
		})		
	},

	Edit: function(req,res) {
		var id=req.param('id',null);
		User.findOne().where({'id':id}).exec(function(err, model) {

		if(req.method=='POST'&&req.param('User',null)!=null)
		{
			var usr=req.param('User',null);

			model.firstname=usr.firstname;
			model.lastname=usr.lastname;
			model.email=usr.email;
			model.user_type_id=usr.user_type_id;


			model.save(function(err){
				if (err) {
					return res.send('Error');
				}
			});

			User_status_info.findOne().where({'user_id':id}).exec(function(err, model1) {
				if (err) {
					res.send('Error');
				}else{
					if(usr.assign_device){  
						model1.assign_device_status='1'; 
						model1.assign_device_num=usr.assign_device;
					}else{ 
					    model1.assign_device_status='0'; 
						model1.assign_device_num=null;
					}
					model1.save(function(err){
				      if (err) {
					    res.send('Error');
					  }
					});
				}
			});

			res.redirect( '/users');
		}
		else
		{
			User_status_info.findOne().where({'user_id':id}).exec(function(err, model1) {
			  res.locals.layout = 'layout1.ejs';

			  return res.view( 'User/edit',{'model':model,'model1':model1});
		    });
		}
		});
	},

	destroy: function (req, res) {
		var id=req.param('id',null);
		User.findOne().where({'id':id}).exec(function(err, usar) {

			usar.delete_status = 1;
			usar.save(function(err){
				if (err) {
				res.send('Error');
				}else {
				res.redirect( '/users');

				}
			});
		});
	},

	Form: function(req,res) {
		res.locals.layout = 'layout1.ejs';
		return res.view('User/form.ejs',{user: {}, data: {}});
	},

	createUser: function(req,res) {
		var form_data = req.body;

		form_data.email = v.trim(form_data.email).toLowerCase();
		form_data.firstname = v.trim(form_data.firstname);
		form_data.lastame = v.trim(form_data.lastname);

		var errors = [];
		if (!v.isEmail(form_data.email)) {
			var data = {};
			data.error = "Invalid email address";
			res.locals.layout = 'layout1.ejs';
			return res.view('User/form.ejs',{user: form_data, data: data});
		}
		form_data.parent_id = req.session.userid;
		if (form_data.email) {
			console.log("test for user create");
			User.findOne().where({'email': form_data.email}).exec(function (err, user) {
			if(err) {
				res.redirect('/signUp');
			} else if(user){
				var data = {};
				data.error = "This email id has been used. Use another email id.";
				console.log(data);
				res.locals.layout = 'layout1.ejs';
				res.view('User/form.ejs',{user: form_data, data: data});
			} else {
				User.create(form_data, function(err, auth) {
				if(err) {
					console.log(err);
				} else {
          	/*for(var i=1;i<=7;i++) {
	          	var time_allocation = {};
	          	time_allocation.user_id = auth.id;
	          	time_allocation.from_time = '00:00:00';
	          	time_allocation.to_time = '23:59:59';
	          	if(i==1)
	          	{
	          		time_allocation.day = "Mdoesn'tonday";
	          	} else if(i==2) {
	          		time_allocation.day = "Tuesday";
	          	} else if(i==3) {
	          		time_allocation.day = "Wednesday";
	          	} else if(i==4) {
	          		time_allocation.day = "Thursday";
	          	} else if(i==5) {
	          		time_allocation.day = "Friday";
	          	} else if(i==6) {
	          		time_allocation.day = "Saturday";
	          	} else if(i==7) {
	          		time_allocation.day = "Sunday";
	          	}
	          	User_time_alloc.create(time_allocation, function(err1,auth1) {
	          	if(err1) { 
	          		console.log(err1); 
	          	}
	          	else {
	          		console.log('User time allocated successfully');
	          	}
          		});
			}*/
					var user_status = {};
					user_status.user_id = auth.id;
					user_status.availibility_status = 1;
					if(req.body.assign_device){
						user_status.assign_device_status = 1;
						user_status.assign_device_num = req.body.assign_device;
		            }else{
		               user_status.assign_device_status = 0;
		          	   user_status.assign_device_num = null;
					}
					User_status_info.create(user_status, function(err2,auth2) {
			          	if(err2) { 
							console.log(err2); 
						}
						else {
							console.log('User status created successfully');
						}
		          	});
		          	console.log('User created successfully');
		          	res.redirect('/users');
				}
				});
			}
		});
		}
	},
	getChangePassword: function (req, res) {
		var data = {};
		res.locals.layout = 'layout1.ejs';
		res.view('auth/changePassword.ejs',{userId: req.param('id', null), data: data});
	},
  	postChangePassword: function (req, res) {
		var id=req.param('id',null);
		var form_data = req.body;
 
    User.findOne().where({'id':id, 'password': form_data.old_password}).exec(function(err, user) {
    	if (user === undefined) {
    		var data = {};
	  		data.error = "doesn't get any record with this old password";
	  		res.locals.layout = 'layout1.ejs';
	    	res.view('auth/changePassword.ejs',{userId: id, data: data});
    	} else if (form_data.new_password.length <= 6) {
	    	var data = {};
	  		data.error = "password length must be greater than 6 character";
	  		res.locals.layout = 'layout1.ejs';
	    	return res.view('auth/changePassword.ejs',{userId: id, data: data});
	    } else if (form_data.new_password !== form_data.password_confirm) {
	    	var data = {};
	  		data.error = "Please enter confirm password same as password";
	  		res.locals.layout = 'layout1.ejs';
	    	return res.view('auth/changePassword.ejs',{userId: id, data: data});
	    }else if (err) {
    		var data = {};
	  		data.error = err.message;
	  		res.locals.layout = 'layout1.ejs';
	    	res.view('auth/changePassword.ejs',{userId: id, data: data});
    	} else {
				user.password = form_data.new_password;
				user.save(function(err){
					if (err) {
						res.send('Error');
					}
				});
				 res.redirect( '/users');
			}
		});
  },
}