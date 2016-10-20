var lodash = require('lodash');

module.exports = {

	AllocateTime: function(req,res) {
		var id=req.param('id',null);
		
		User_status_info.findOne().where({'user_id':id}).exec(function(err,result){
		//	console.log(result);
			if(err){
				res.redirect('/users')
			}			
			if(req.method=='POST')
			{
				result.availibility_status = req.body.duration;
				result.save(function(err){
					if(err) {
						console.log(err);
					}
					else {
						console.log("Successfully updated");
					}
				});
				
			//	var day = count(req.body.w_day);
				if(req.body.duration == 2){
					User_time_alloc.find().where({'user_id':id}).exec(function(error, data){
						if(data){ 
							User_time_alloc.destroy({'user_id':id}).exec(function(err) {  
								if(err) {
									console.log(err);
								} else { 
						//	list =  req.body.w_day.size();

							_.forEach(req.body.w_day, function(value) {
								console.log(value);
								var user_status = {};
								user_status.from_time = req.body.from_time;
								user_status.to_time = req.body.to_time;
								user_status.day = value;
								user_status.user_id = id;
							  	User_time_alloc.create(user_status,function (error1,resp){
							  		if(error1){
							  			console.log("not created");
							  		} else {
							  			console.log("created successfully");
							  		//	res.locals.layout = 'layout1.ejs';     	
							  		}
							  	})
							});
							res.redirect('/users');
							}  });

					    } else {  }
					//	var len = data.length();
					//	console.log(len);

					});
				}
				else {
					res.redirect('/users');
				}
		//		user_status.from_time = 
			}
			else
			{
				if(result.availibility_status == 2)
				{
					User_time_alloc.find().where({'user_id':id}).exec(function(err1,model){
						if(err1) {
				//			console.log("error for data");
						} else {
							console.log(model);
							var response = {};
							
							var mon=tue=wed=thu=fri=sat=sund=0;
							_.forEach(model, function(value) {
								var from_time = value.from_time;
								var to_time = value.to_time;
								response.from_time = from_time;
								response.to_time = to_time;
								
								if(value.day=='Monday'){  mon=1; }
								if(value.day=='Tuesday'){  tue=1; }
								if(value.day=='Wednesday'){  wed=1; }
								if(value.day=='Thursday'){  thu=1; }
								if(value.day=='Friday'){  fri=1; }
								if(value.day=='Saturday'){  sat=1; }
								if(value.day=='Sunday'){  sund=1; }

								
							})
						//	console.log(from_time);
							response.result = result;
							response.model = model;
							response.mon = mon;
							response.tue = tue;
							response.wed = wed;
							response.thu = thu;
							response.fri = fri;
							response.sat = sat;
							response.sund = sund;

							console.log(response);
							res.locals.layout = 'layout1.ejs';
							return res.view( 'Usertimeallocate/index',{'response':response});
						}
					})
				}
				else {
					var model = {};
					var response = {};
					response.result = result;
					response.model = model;
					console.log(response);
					res.locals.layout = 'layout1.ejs';
					return res.view( 'Usertimeallocate/index',{'response':response});
				}
				
			/*	console.log(response);
				console.log(model);
			    console.log('load data');*/
				
			}
		})
	},

}