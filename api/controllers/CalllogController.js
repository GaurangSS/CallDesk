var sails = require('sails');
var client = require('twilio')(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
	sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
var lodash = require('lodash');
var moment = require('moment-timezone');
module.exports = {
  	call_log: function (req, res) {

		call_log.find().populate('get_log').exec(function(err, data) {
			if(err){
				console.log(err);
			}else{
				//console.log(data);	
				var data1 = [];
				console.log(data);
				_.forEach(data, function(value) {
					var abc = {}
					abc.from = value.from_call;
					abc.to = value.to_call ;
					abc.date = moment(value.from_time).format('DD-MM-YYYY');
					abc.from_time = moment(value.from_time).format('hh:mm:ss');
					abc.to_time = moment(value.to_time).format('hh:mm:ss');;
					abc.callType = value.call_type;
					abc.duration = 1;
					abc.status = value.get_log[0].DialCallStatus;
					abc.recordingURL = value.get_log[0].RecordingUrl;
					abc.recording = value.record;
					data1.push(abc);
				});
				//data1.list = data.calls;
				console.log(data1)

			    res.locals.layout = 'layout1.ejs';
				return res.view('Calls/call_log.ejs',{ data: data1,moment: moment});
			}	
        });
  	},

};