var http = require('http');
var path = require('path');
var twilio = require('twilio');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

module.exports = {
  
  createToken: function (req, res) {    
    
    var data = {};
    
    var identity = 'kevin';
    
    var capability = new twilio.Capability(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
          sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
        capability.allowClientOutgoing(sails.config.myconf.twilioDetails.TWILIO_TWIML_APP_SID);

    capability.allowClientIncoming(identity);

    var token = capability.generate();

    data.identity = identity;
    data.token = token;
    res.view('Twilioclient/createToken.ejs',data);
  }
}