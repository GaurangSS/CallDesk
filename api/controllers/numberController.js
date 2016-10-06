var sails = require('sails');
var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

module.exports = {

	getContectNumber: function (req, res) {
		sails.log.info('Calling Get method');
		var cou ;

		cou = country.find().exec(function (err, users){
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.render('details',{users});
		});

  },
  postContectNumber: function (req, res) {

	 	var ctx = req.body;
	 	var contectDetails = [];
	 	sails.log.info(ctx);

	 	countryArea.create(ctx).exec(function (err, data){
		  if (err) { return res.serverError(err); }

		  sails.log.info('-=-=-');
		  return data;
		});

	 	// var countryName = ctx.countryName;
  	// var areaCode = ctx.areaCode;

    // to get contect number
    
  //   client.availablePhoneNumbers(countryName).local.list({
		//   areaCode: areaCode
		// }, function(err, data) {
			
	 //  	var number = data.availablePhoneNumbers[0];
	 //  	contectDetails = data.availablePhoneNumbers;
		// 	sails.log.info(contectDetails);
		// 	sails.log.info('-=-=-=-' + contectDetails.length);	

		// });

		//
		return res.render('contactNumbers', {contectDetails: contectDetails})

  },
  postAreaCode: function (req, res) {
  	sails.log.info('inside'+req.body);
  	var areacode = [];

  	areaCode.find({select: ['areaCode']})
			.where({'counName': 'uk'})
			.exec(function (err, areaCodes){
		  if (err) {
		    return res.serverError(err);
		  }
		  sails.log.info('herer');
		  sails.log.info(areaCodes);
		  return res.json(areaCodes);;
		});

  },

};