module.exports = {

	List: function(req,res) {
		User.find().where({'parent_id':req.session.userid})	.exec(function(err,result){
			if(err){ 
				console.log(err);
			}else{   
				var data={};
				data.list = result;
				console.log(data);
				res.locals.layout = 'layout1.ejs';
		        return res.view('User/list.ejs',data);
			}
		})		
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