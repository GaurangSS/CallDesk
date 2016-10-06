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
  	sails.log.info('inside'+req.body);
  	var areacode = [];

  	areaCode.find({select: ['areaCode']})
			.where({'counName': 'uk'})
			.exec(function (err, areaCodes){
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.json(areaCodes);;

		sails.log.info('Calling Get method');
		var cou ;

		cou = country.find().exec(function (err, users){
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.render('details',{users});

		});

  }
},
  postContectNumber: function (req, res) {

	 	var ctx = req.body;
	 	var contectDetails = [];
	 	sails.log.info(ctx);

	 	countryArea.create(ctx).exec(function (err, data){
		  if (err) { return res.serverError(err); }


		  return data;
		});
		return res.render('contactNumbers', {contectDetails: contectDetails})

  },
 

};