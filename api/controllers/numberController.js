var sails = require('sails');
var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

var lodash = require('lodash');

module.exports = {

	getContectNumber: function (req, res) {

		country.find().exec(function (err, countries){
		  if (err) {
		    return res.serverError(err);
		  }
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
			
	  	var number = data.availablePhoneNumbers[0];
	  	contectDetails = data.availablePhoneNumbers;

			return res.json(contectDetails);

		});
  },

  postbuyNumber: function (req, res) {

  	var number = req.body.number;

  	console.log(number)


  	// client.incomingPhoneNumbers.create({
	  //   phoneNumber: number
	  // }, function(err, purchasedNumber) {
	  // 	if (err) {
	  // 	console.log(purchasedNumber)

	  // 	}
	  // 	purchasedNumber.contact_name= 'testNumber';
	  // 	numberInfo.create(purchasedNumber, function(err, auth) {
	  //     if(err) {
	  //     	console.log(err);
	  //     } else {
	  //     	console.log('successfully inserted');
	  //     }
	  //   });


	  //   var call_status = {};
	  // 	call_status.number_id = 1;
	  // 	call_status.availibility_status = 1;
	  // 	call_status.assign_device_status = 0;

	  // 	call_status_info.create(call_status, function(err2,auth2) {
		 //  	if(err2) {
		 //  		console.log(err2);
		 //  	} else {
		 //  		console.log('successfully inserted2');
		 //  	}
	  // 	});

	  	

	  //   // return res.json(purchasedNumber);
	  // });

	  User.find().exec(function (err, users){
			  if (err) {
			    return res.serverError(err);
			  }
			  var result = {}
			  return res.view('allocatenumbertouser.ejs',{number: '+15102530193', users: users, result: result});
			});


		// numberInfo.create(form_data, function(err, auth) {
  //     if(err) {
  //     	console.log(err);
  //     } else {
  //     	console.log('successfully inserted');
  //     }
  //   });
	  

  	// var form_data = { sid: 'PNf6f07c39158731dbc8f01f44ba04cbe7',
	  // account_sid: 'ACe732ab6c48c553e824547bce75dfc861',
	  // friendly_name: '(510) 253-0193',
	  // phone_number: '+15102530193',
	  // contact_name: 'testNumber',
	  // voice_url: null,
	  // voice_method: 'POST',
	  // voice_fallback_url: null,
	  // voice_fallback_method: 'POST',
	  // voice_caller_id_lookup: false,
	  // date_created: 'Sat, 08 Oct 2016 13:18:15 +0000',
	  // date_updated: 'Sat, 08 Oct 2016 13:18:15 +0000',
	  // sms_url: '',
	  // sms_method: 'POST',
	  // sms_fallback_url: '',
	  // sms_fallback_method: 'POST',
	  // address_requirements: 'none',
	  // beta: false,
	  // capabilities: { voice: true, sms: true, mms: true },
	  // status_callback: '',
	  // status_callback_method: 'POST',
	  // api_version: '2010-04-01',
	  // voice_application_sid: null,
	  // sms_application_sid: '',
	  // trunk_sid: null,
	  // emergency_status: 'Inactive',
	  // emergency_address_sid: null,
	  // uri: '/2010-04-01/Accounts/ACe732ab6c48c553e824547bce75dfc861/IncomingPhoneNumbers/PNf6f07c39158731dbc8f01f44ba04cbe7.json',
	  // accountSid: 'ACe732ab6c48c553e824547bce75dfc861',
	  // friendlyName: '(510) 253-0193',
	  // phoneNumber: '+15102530193',
	  // voiceUrl: null,
	  // voiceMethod: 'POST',
	  // voiceFallbackUrl: null,
	  // voiceFallbackMethod: 'POST',
	  // voiceCallerIdLookup: false,
	  // smsUrl: '',
	  // smsMethod: 'POST',
	  // smsFallbackUrl: '',
	  // smsFallbackMethod: 'POST',
	  // addressRequirements: 'none',
	  // statusCallback: '',
	  // statusCallbackMethod: 'POST',
	  // apiVersion: '2010-04-01',
	  // voiceApplicationSid: null,
	  // smsApplicationSid: '',
	  // trunkSid: null,
	  // emergencyStatus: 'Inactive',
	  // emergencyAddressSid: null };
	  
		// console.log(form_data);

 
  },

  getbuyNumber: function (req, res) {

  	var number = req.param('number', null);

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

			call_status_info.findOne().where({'number_id':numberId}).exec(function(err,result){
					result.save(function(err){
						if(err) {
							console.log(err);
						}
						else {
							console.log("Successfully updated");
						}
					});

					if (req.body.duration == 2) {
						call_time_alloc.findOne().where({'number_id': numberId}).exec(function(error, data){

							if (data) {
								call_time_alloc.destroy({'number_id': numberId}).exec(function(err) {
									if (err) {
										console.log(err);
									} else {
										console.log('delete successfully');
										_.forEach(req.body.w_day, function(value) {

											var call_status = {};
											call_status.from_time = req.body.from_time;
											call_status.to_time = req.body.to_time;
											call_status.day = value;
											call_status.number_id = numberId;
										  	call_time_alloc.create(call_status,function (error1,resp){
										  		if(error1){
										  			console.log("not created");
										  		} else {
										  			console.log("created successfully");
										  		}
										  	})
										});
									}

								});
							} else {

								_.forEach(req.body.w_day, function(value) {

									var call_status = {};
									call_status.from_time = req.body.from_time;
									call_status.to_time = req.body.to_time;
									call_status.day = value;
									call_status.number_id = numberId;
								  	call_time_alloc.create(call_status,function (error1,resp){
								  		if(error1){
								  			console.log("not created");
								  		} else {
								  			console.log("created successfully");
								  		}
								  	})
								});
							}
						});

					}
			});
  	});
	  	
  	return res.redirect('/ContectNumbers');
  },

};