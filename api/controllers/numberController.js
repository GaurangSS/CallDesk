var sails = require('sails');

var client = require('twilio')(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
	sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);

var lodash = require('lodash');

module.exports = {

	getContectNumber: function (req, res) {

		country.find().exec(function (err, countries){
		  if (err) {
		    return res.serverError(err);
		  }
		  res.locals.layout = 'layout1.ejs';
		  return res.view('Number/numbers.ejs',{countries});
		});
  	},
  	postAreaCode: function (req, res) {

  	var areacode = [];

  	areaCode.find({select: ['areaCode','areaName']})
			.where({'counName': req.body.counName})
			.exec(function (err, areaCodes){
				sails.log.info(areaCodes);
		  if (err) {
		    return res.serverError(err);
		  }
		  console.log('-=-')
		  console.log(areaCodes)
		  return res.json(areaCodes);
		});
	},

  postContectNumber: function (req, res) {

	 	var ctx = req.body;
    
    var countryName = ctx.counName;
  	var areaCode = ctx.areaCode;
  	
    // to get contect number
    
    client.availablePhoneNumbers(countryName).local.list({
		  areaCode: areaCode
		}, function(err, data) {
			if(err) {
		
				console.log(err);
			} else {
				if (data.availablePhoneNumbers.length <= 0) {
					var errors = {};
					errors.error = 'Number not available.';
					return res.json({errors: errors});
				} else {
			  	var number = data.availablePhoneNumbers[0];
			  	contectDetails = data.availablePhoneNumbers;

					return res.json(contectDetails);
				}
			}
		});
  },

  postbuyNumber: function (req, res) {

  	var number = req.body.number;


  	client.incomingPhoneNumbers.create({
	    phoneNumber: number
	  }, function(err, purchasedNumber) {
	  	if (err) {
	  	   console.log(err)
	  		numberInfo.find().exec(function(err1, numbers) {
		  		if (err1) {
		  			//return res.serverError(err);
		  		}
		  		var data = {};
		  		data.error = err.message;
		  		res.locals.layout = 'layout1.ejs';
		  		res.view('Number/numberslist.ejs', {numbers,data});
		  	});
	  	}else{
	  	numberDetail = {};
	  	numberDetail.sid = purchasedNumber.sid;
	  	numberDetail.account_sid = purchasedNumber.account_sid,
			numberDetail.friendly_name = purchasedNumber.friendly_name,
			numberDetail.phone_number = purchasedNumber.phone_number,
			numberDetail.delete_status = 0,
			numberDetail.contact_name = req.body.conName,
			numberDetail.date_created = purchasedNumber.date_created,
			numberDetail.date_updated = purchasedNumber.date_updated,

	  	numberInfo.create(numberDetail, function(err, auth) {
	      if(err) {
	      	console.log(err);
	      } else {
	      	var message = {};
	      	message.user_id = req.session.userid;
	      	message.number_id = auth.id;
	      	message.msg_type = 1;
	      	message.music_type = 1;
	      	message.audio_text = "Welcome, we will take your call in a few minutes, please hold.";
	      	NumberMessage.create(message, function(error,resp) {
	      		if(error) {
	      			console.log(error);
	      		} else {
	      			console.log("message added");
	      		}
	      	});
	      	var call_status = {};
		  	call_status.number_id = auth.id;
		  	call_status.availibility_status = 1;
		  	call_status.assign_device_status = 0;

		  	call_status_info.create(call_status, function(err2,auth2) {
			  	if(err2) {
			  		console.log(err2);
			  	} else {
			  		console.log('successfully inserted2');
			  	}
		  	});
	      	console.log('successfully inserted');
	      }
	    });

	    

	  	User.find({ or : [{'id':req.session.userid},{'parent_id':req.session.userid}]}).where({delete_status: { '!': '1' }}).exec(function (err, users){
			  if (err) {
			    return res.serverError(err);
			  }
			  var result = {}
			  res.locals.layout = 'layout1.ejs';
			  console.log('usersss')
			  console.log(users)
			  return res.view('Number/allocatenumbertouser.ejs',{number: purchasedNumber.phone_number, users: users, result: result});
			});
	  	
          }
	    // return res.json(purchasedNumber);
	  });

	// numberInfo.create(form_data, function(err, auth) {
  //     if(err) {
  //     	console.log(err);
  //     } else {
  //     	console.log('successfully inserted');
  //     }
  //   });
 
  },

  getbuyNumber: function (req, res) {

  	var number = req.param('number', null);
  	res.locals.layout = 'layout1.ejs';

  	res.view('Number/buyNumber.ejs', {number});
  },
  postallocateNumberToUSer: function (req, res) {
  	var users = req.body.users;
  	var numberId
  	numberInfo.findOne().where({'phone_number': req.body.number}).exec(function(err, number) {
  		if (err) {
  			console.log(err);
  		}
  		numberId = number.id;
	  	// allocate number to user
	  	_.forEach(req.body.users, function(value) {
	  		allocateNumber.findOne().where({'userId': value, 'numberId': numberId}).exec(function(err, alloc) {
	  			if (err) {
	  				res.redirect('/numberslist');
	  			} else if(alloc === undefined) {
	  				var form_data = {};
						form_data.userId = value;
						form_data.numberId = numberId;
						form_data.allocationStatus = true;

						allocateNumber.create(form_data, function(err, auth) {
					    if(err) {
					    	console.log(err);
					    } else {
					    	console.log(auth);

					    	console.log('successfully inserted');
					    }
					  });
	  			}
	  		});
				
			});
  	});
	  	
  	return res.redirect('/numberslist');
  },
  
  numberslist: function (req, res) {

    	numberInfo.find({'delete_status':'0'}).exec(function(err, numbers) {

  		if (err) {
  			return res.serverError(err);
  		}
  			console.log(numbers);
  			var data = {};
  		res.locals.layout = 'layout1.ejs';

  		res.view('Number/numberslist.ejs', {numbers,data});

  	});
  },

releaseNumber: function(req, res) {
  	var number=req.param('number',null);
	//	console.log(id);
	numberInfo.findOne().where({'id':number}).exec(function(err, usar) {

		usar.delete_status = 1;
		pid = usar.sid;
		usar.save(function(err){
			if (err) {
				res.send('Error');
			}else {
				client.incomingPhoneNumbers(pid).delete(function(err, number) {
				    if(err) {
				    	console.log(err)
				    } else {
				    	console.log(number);
				    	res.redirect( '/numberslist');
				    }
				});
				
			}
		});
	});
},

/*Update_music: function(req,res) {
	var number=req.param('number',null);
	var user=req.param('id',null);

	
//	res.redirect( '/numberslist');
},*/

musicNumber: function(req,res) {
	var number=req.param('number',null);

	NumberMessage.findOne().where({'number_id':number}).exec(function(err, rec) {
		if(req.method=='POST')
		{
			console.log("test");
			console.log(req.body);
			console.log("/test");
			rec.audio_text = req.body.audio_text;
			rec.save(function(err){
				if(err) {
					console.log(err);
				}
				else {
					res.redirect( '/numberslist');
					console.log("Successfully updated");
				}
			});
		} else {
			console.log(rec);
			/*var data1 = {};
			var data2 = {};
			var data3 = {};
			var data4 = {};
			_.forEach(rec, function(value) {
				if(value.msg_type == 1) {
					data1 = value;
					console.log(data1);
				}
				if(value.msg_type == 2) {
					data2 = value;
					console.log(data2);
				}
				if(value.msg_type == 3) {
					data3 = value;
					console.log(data3);
				}
				if(value.msg_type == 4) {
					data4 = value;
					console.log(data4);
				}
			});*/
			var data={};
			data.list = rec;
			res.locals.layout = 'layout1.ejs';
			return res.view('Number/music.ejs',data);
		}
	});
},

  AllocateTime: function(req,res) {
		var id=req.param('id',null);
		
		call_status_info.findOne().where({'number_id':id}).exec(function(err,result){
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
				
				if(req.body.duration == 2){
					call_time_alloc.find().where({'number_id':id}).exec(function(error, data){
						if(data){ 
							call_time_alloc.destroy({'number_id':id}).exec(function(err) {  
								if(err) {
									console.log(err);
								} else { 

							_.forEach(req.body.w_day, function(value) {
								console.log(value);
								var call_status = {};
								call_status.from_time = req.body.from_time;
								call_status.to_time = req.body.to_time;
								call_status.day = value;
								call_status.number_id = id;
							  	call_time_alloc.create(call_status,function (error1,resp){
							  		if(error1){
							  			console.log("not created");
							  		} else {
							  			console.log("created successfully");
										
							  		}
							  	})
							});
							res.redirect('/numberslist');
							}  });

					    } else {  }

					});
				}
				else {
					res.redirect('/numberslist');
				}
			}
			else
			{
				if(result.availibility_status == 2)
				{
					call_time_alloc.find().where({'number_id':id}).exec(function(err1,model){
						if(err1) {
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
							return res.view( 'Number/allocateTimeToNumber.ejs',{'response':response});
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
					return res.view( 'Number/allocateTimeToNumber.ejs',{'response':response});
				}
			}
		})
	},
	getallocateNumberToUSer :  function (req, res) {
		var numberId=req.param('id',null);
		console.log(numberId)
		numberInfo.findOne().where({'id': numberId}).exec(function(err, number) {
			if (err) {
				res.redirect('/numberslist');
			} else if (number != undefined) {

				allocateNumber.find({select:['userId']}).where({'numberId': numberId}).exec(function(err, allocatedUser) {
					if (err){
						res.redirect('/numberslist');
					}
					var abc = _.map(allocatedUser, 'userId');

					User.find({ or : [{'id':req.session.userid},{'parent_id':req.session.userid}]}).where({delete_status: { '!': '1' }}).exec(function (err, users){
					  if (err) {
					    return res.serverError(err);
					  }
					  var result = {};
					  
					   var userslist = [];

					  _.forEach(users, function (user) {
					    var user1 = user;
					    user.selected = abc.indexOf(user.id) != '-1' ? 'true' : 'false';
					    userslist.push(user);
					  });
					  console.log(userslist)
					  res.locals.layout = 'layout1.ejs';
					  return res.view('Number/allocatenumbertouser.ejs',{number: number.phone_number, users: userslist, result: result, allocatedUser: allocatedUser});
					});
				});
					
			} else {
				res.locals.layout = 'layout1.ejs';
				res.redirect('/numberslist');
			}
		});
			

	},           
};