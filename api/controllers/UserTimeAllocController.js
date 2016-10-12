module.exports = {

	AllocateTime: function(req,res) {
		var id=req.param('id',null);
		
		User_status_info.findOne().where({'user_id':id}).exec(function(err,result){
			if(req.method=='POST')
			{


				console.log("post data");
				console.log(req.body);
				
				result.availibility_status = req.body.duration;
				result.save(function(err){
					if(err) {
						console.log(err);
					}
					else {
						console.log("Successfully updated");
					}
				});
				var user_status = {};
				user_status.from_time = req.body.from_time;
				user_status.to_time = req.body.to_time;
			//	var day = count(req.body.w_day);
				User_time_alloc.find().where({'user_id':id}).exec(function(error, data){
					console.log('check db data alreay exist');
					console.log(data);
					if(data){ console.log('data yes');  

						User_time_alloc.destroy({'user_id':id}).exec(function(err) {   console.log('delete successfully');  });

						var new_data = {};
						new_data.list =  req.body.w_day;

				    } else {   console.log('data not present'); }
				//	var len = data.length();
				//	console.log(len);

				});
		//		user_status.from_time = 
			}
			else
			{

			    console.log('load data');
				res.locals.layout = 'layout1.ejs';
				console.log(result);
				return res.view( 'Usertimeallocate/index',{'result':result});
			}
		})
	},

}