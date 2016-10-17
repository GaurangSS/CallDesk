var sails = require('sails');


// var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
// var authToken = "1ee4bc07c48d297d817016756d8008f4";

var accountSid = 'ACa74fbb703841458ad00bb980209bde35';
var authToken = "0859cc74a446c3b44d1212861eb9e2e0";


var client = require('twilio')(accountSid, authToken);

var lodash = require('lodash');

module.exports = {

	getContectNumber: function (req, res) {

		country.find().exec(function (err, countries){
		  if (err) {
		    return res.serverError(err);
		  }
		  res.locals.layout = 'layout1.ejs';
		  return res.view('numbers.ejs',{countries});
		});
  },
  postAreaCode: function (req, res) {

  	var areacode = [];

  	areaCode.find({select: ['areaCode']})
			.where({'counName': req.body.counName})
			.exec(function (err, areaCodes){
				sails.log.info(areaCodes);
		  if (err) {
		    return res.serverError(err);
		  }
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

				console.log(data);

	  	var number = data.availablePhoneNumbers[0];
	  	contectDetails = data.availablePhoneNumbers;

			return res.json(contectDetails);
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
		  		res.view('numberslist.ejs', {numbers,data});
		  	});
	  	}else{
	  	numberDetail = {};
	  	numberDetail.sid = purchasedNumber.sid;
	  	numberDetail.account_sid = purchasedNumber.account_sid,
		  numberDetail.friendly_name = purchasedNumber.friendly_name,
		  numberDetail.phone_number = purchasedNumber.phone_number,
		  numberDetail.contact_name = req.body.conName,
		  numberDetail.date_created = purchasedNumber.date_created,
		  numberDetail.date_updated = purchasedNumber.date_updated,

	  	numberInfo.create(numberDetail, function(err, auth) {
	      if(err) {
	      	console.log(err);
	      } else {
	      	console.log('successfully inserted');
	      }
	    });

	    var call_status = {};
	  	call_status.number_id = 1;
	  	call_status.availibility_status = 1;
	  	call_status.assign_device_status = 0;

	  	call_status_info.create(call_status, function(err2,auth2) {
		  	if(err2) {
		  		console.log(err2);
		  	} else {
		  		console.log('successfully inserted2');
		  	}
	  	});

	  	User.find().exec(function (err, users){
			  if (err) {
			    return res.serverError(err);
			  }
			  var result = {}
			  res.locals.layout = 'layout1.ejs';
			  return res.view('allocatenumbertouser.ejs',{number: purchasedNumber.phone_number, users: users, result: result});
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

  	res.view('buyNumber.ejs', {number});
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
	  	_.forEach(req.body.users, function(value, key) {

				var form_data = {};
				form_data.userId = key;
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
			});
  	});
	  	
  	return res.redirect('/numberslist');
  },
  numberslist: function (req, res) {

    	numberInfo.find().exec(function(err, numbers) {

  		if (err) {
  			return res.serverError(err);
  		}
  			console.log(numbers);
  			var data = {};
  		res.locals.layout = 'layout1.ejs';

  		res.view('numberslist.ejs', {numbers,data});

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
							return res.view( 'allocateTimeToNumber.ejs',{'response':response});
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
					return res.view( 'allocateTimeToNumber.ejs',{'response':response});
				}
			}
		})
	},
};