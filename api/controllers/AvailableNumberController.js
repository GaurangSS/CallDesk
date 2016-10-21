/*var http = require('http');
var path = require('path');
//var twilio = require('twilio');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

module.exports = {
  
  availNum: function (req, res) {     

    var client = new twilio.Capability(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
          sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
  
     
     var conname = 'US';
     var areanum = '510';

      client.availablePhoneNumbers(conname).local.list({ areaCode: areanum }, function(err, data) {
   
        var data1 = {};
        data1.list = data;
        console.log(data1.list);
        res.view('Twilioclient/AvailNumber.ejs',data1);
      })
  }
};*/


var accountSid = 'ACe732ab6c48c553e824547bce75dfc861';
var authToken = "1ee4bc07c48d297d817016756d8008f4";
var client = require('twilio')(accountSid, authToken);

module.exports = {

  availNum: function (req, res) {

   /* var ctx = req.body;
    var contectDetails;

    
    sails.log.info(countryName);  
    sails.log.info(areaCode); */
    

    //var countryName = ctx.countryName;
    //var areaCode = ctx.areaCode;

    var countryName = "US";
    var areaCode = "510";

    // to get contect number
    
    client.availablePhoneNumbers(countryName).local.list({
     areaCode: areaCode
    }, function(err, data) {
      
      console.log(err);
     
    
    });
    //

   // return res.render('contactNumbers');
  },
 
};