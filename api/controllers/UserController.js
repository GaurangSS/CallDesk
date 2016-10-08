module.exports = {

	List: function(req,res) {
		User.findOne().where({'id':req.session.userid}).exec(function(err,result1){
			if(err){ 
				console.log(err);
			}else{ 
				User.find().where({'parent_id':req.session.userid}).exec(function(err,result){
					var data={};
				//	var data1={};
					data.list = result;
					data.list1 = result1;
					console.log(data);
				//	console.log(data1);
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

			model.save(function(err){
				if (err) {
				res.send('Error');
				}else {
				res.redirect( '/users');

				}
			});
		}
		else
		{
			res.locals.layout = 'layout1.ejs';
			return res.view( 'User/edit',{'model':model});
		}
		});
	},

	destroy: function (req, res) {
		console.log(req.param);
		var id=req.param('id',null);
		console.log(id);
		User.findOne().where({'id':id}).exec(function(err, usar) {
			usar.destroy(function(err) {
			//	req.flash('success','User deleted successfully');
				res.redirect('/users');
			// record has been removed
			});
		});
	},

	Form: function(req,res) {
		res.locals.layout = 'layout1.ejs';
		return res.view('User/form.ejs');
	},

	createUser: function(req,res) {	
		var form_data = req.body;
		console.log(form_data);
		form_data.parent_id = req.session.userid;
		User.create(form_data, function(err, auth) {
          if(err){ console.log(err); }else {  console.log('successfully inserted'); }
        });
        res.redirect('/users');
	},
}