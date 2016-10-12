var sails = require('sails');
var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

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

  	var form_data = { sid: 'PNf6f07c39158731dbc8f01f44ba04cbe7',
	  account_sid: 'ACe732ab6c48c553e824547bce75dfc861',
	  friendly_name: '(510) 253-0193',
	  phone_number: '+15102530193',
	  contact_name: 'testNumber',
	  voice_url: null,
	  voice_method: 'POST',
	  voice_fallback_url: null,
	  voice_fallback_method: 'POST',
	  voice_caller_id_lookup: false,
	  date_created: 'Sat, 08 Oct 2016 13:18:15 +0000',
	  date_updated: 'Sat, 08 Oct 2016 13:18:15 +0000',
	  sms_url: '',
	  sms_method: 'POST',
	  sms_fallback_url: '',
	  sms_fallback_method: 'POST',
	  address_requirements: 'none',
	  beta: false,
	  capabilities: { voice: true, sms: true, mms: true },
	  status_callback: '',
	  status_callback_method: 'POST',
	  api_version: '2010-04-01',
	  voice_application_sid: null,
	  sms_application_sid: '',
	  trunk_sid: null,
	  emergency_status: 'Inactive',
	  emergency_address_sid: null,
	  uri: '/2010-04-01/Accounts/ACe732ab6c48c553e824547bce75dfc861/IncomingPhoneNumbers/PNf6f07c39158731dbc8f01f44ba04cbe7.json',
	  accountSid: 'ACe732ab6c48c553e824547bce75dfc861',
	  friendlyName: '(510) 253-0193',
	  phoneNumber: '+15102530193',
	  voiceUrl: null,
	  voiceMethod: 'POST',
	  voiceFallbackUrl: null,
	  voiceFallbackMethod: 'POST',
	  voiceCallerIdLookup: false,
	  smsUrl: '',
	  smsMethod: 'POST',
	  smsFallbackUrl: '',
	  smsFallbackMethod: 'POST',
	  addressRequirements: 'none',
	  statusCallback: '',
	  statusCallbackMethod: 'POST',
	  apiVersion: '2010-04-01',
	  voiceApplicationSid: null,
	  smsApplicationSid: '',
	  trunkSid: null,
	  emergencyStatus: 'Inactive',
	  emergencyAddressSid: null };
	  
		// console.log(form_data);

		// numberInfo.create(form_data, function(err, auth) {
  //     if(err) { 
  //     	console.log(err); 
  //     } else {  
  //     	console.log('successfully inserted'); 
  //     }
  //   });
  	User.find().exec(function (err, users){
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.view('allocatenumbertouser.ejs',{number: '+15102530193', users: users});
		});
    

  	// client.incomingPhoneNumbers.create({
	  //   phoneNumber: number
	  // }, function(err, purchasedNumber) {
	  //   return res.json(purchasedNumber);
	  // });
  },

  getbuyNumber: function (req, res) {

  	var number = req.param('number', null);

  	res.view('buyNumber.ejs', {number});
  },
  postallocateNumberToUSer: function (req, res) {

  	var form_data = req.body;
  	console.log(form_data);

  	return res.redirect('/ContectNumbers');
  },

};