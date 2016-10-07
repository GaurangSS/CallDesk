var sails = require('sails');
var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

module.exports = {

	getContectNumber: function (req, res) {

		sails.log.info('Calling Get method');
		var cou ;

		country.find().exec(function (err, countries){
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.view('numbers.ejs',{countries});
		});

  },


 postAreaCode: function (req, res) {

  	sails.log.info(req.body);
  	var areacode = [];

  	areaCode.find({select: ['areaCode']})
			.where({'counName': req.body.counName})
			.exec(function (err, areaCodes){
				sails.log.info(areaCodes);
		  if (err) {
		    return res.serverError(err);
		  }
		  return res.json(areaCodes);;
		});

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