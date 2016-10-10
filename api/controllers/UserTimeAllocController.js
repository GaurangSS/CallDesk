module.exports = {

	AllocateTime: function(req,res) {
		var id=req.param('id',null);
		User_time_alloc.findOne().where({'user_id':id}).exec(function(err,result){
			if(req.method=='POST'&&req.param('User',null)!=null)
			{

			}
			else
			{
				res.locals.layout = 'layout1.ejs';
				return res.view( 'Usertimeallocate/index',{'result':result});
			}
		})
	},

}