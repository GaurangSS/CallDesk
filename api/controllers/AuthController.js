//var http = require('http');
//var path = require('path');
var twilio = require('twilio');
//var express = require('express');
//var bodyParser = require('body-parser');
//var app = express();

module.exports = {
  
  createToken: function (req, res) {

    console.log('inside twilio')
    
    var data = {};
    
    var identity = 'kevin';
    
    var capability = new twilio.Capability(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
          sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
        capability.allowClientOutgoing(sails.config.myconf.twilioDetails.TWILIO_TWIML_APP_SID);

    capability.allowClientIncoming(identity);

    var token = capability.generate();

    data.identity = identity;
    data.token = token;
    res.locals.layout = 'layout1.ejs';
    //res.view('call.ejs',data);
    res.view('dash1.ejs');
   
  },
  dashboard: function (req, res) {

    numberInfo.count().exec(function(err, numbers) {
      if (err) {
        console.log(err);
      }

      User.count().exec(function (err, users){
        if (err) {
          console.log(err);
        }
        
        res.locals.layout = 'layout1.ejs';
        res.view('dash.ejs', {numbers, users});
      });
    });
  }
};