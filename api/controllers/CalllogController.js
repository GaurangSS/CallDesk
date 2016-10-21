var sails = require('sails');
var client = require('twilio')(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
	sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
var lodash = require('lodash');
var moment = require('moment-timezone');
module.exports = {

	call_list: function (req, res) {

		/*client.usage.records.list({ category: "calls",StartDate:"2016-10-18",EndDate:"2016-10-18" }, function(err, data) {
	       console.log(data.usageRecords);
	       data.usageRecords.forEach(function(record) {
	        console.log(record.count);
	       });
	    });*/

		client.calls.list(function(err, data) {
			if(err){
				console.log(err);
			}else{
				var data1 = {};
				data1.list = data.calls;
			    res.locals.layout = 'layout1.ejs';
				return res.view('Calls/call_log.ejs',{ data1: data1,moment: moment});			
			}	
        });
  	},
};