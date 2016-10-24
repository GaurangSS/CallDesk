//var http = require('http');
//var path = require('path');
var twilio = require('twilio');
//var express = require('express');
//var bodyParser = require('body-parser');
//var app = express();

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
    res.locals.layout = 'layout1.ejs';
    //res.view('call.ejs',data);
    res.view('dash1.ejs');
   
  },
  logout: function(req, res) {
    req.session.destroy(function(err) {
      return res.redirect('/login');
    });
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
  },
  getForgotPassword: function (req, res) {
    res.view('auth/forgotpassword.ejs', { data: {} });
  },
  postForgotPassword: function (req, res) {
    var id=req.param('id',null);
    var form_data = req.body;

  
    User.findOne().where({'id':id}).exec(function(err, user) {
      if (form_data.password.length <= 6) {
        var data = {};
        data.error = "password length must be greater than 6 character";
        return res.view('auth/forgotpassword.ejs',{userId: id, data: data});
      } else if (form_data.password !== form_data.password_confirm) {
        var data = {};
        data.error = "Please enter confirm password same as password";
        return res.view('auth/forgotpassword.ejs',{userId: id, data: data});
      }else if (err) {
        var data = {};
        data.error = err.message;
        res.view('auth/forgotpassword.ejs',{userId: id, data: data});
      } else {
        user.password = form_data.password;
        user.save(function(err){
          if (err) {
            res.send('Error');
          }
        });
         res.redirect( '/login');
      }
    });
  },
  activateUser: function (req, res) {
    var token = req.param('token', null);
    tokens.findOne().where({'hash': token}).exec(function (err, data) {
       if (err) {
        console.log(err);
       } else {
        User.update({'id': data.userId},{active:true}).exec(function (err, updated){

          if (err) {
            console.log(err);
          } else {
            tokens.destroy({'hash':token}).exec(function (err){
              if (err) {
                console.log(err);
              }
              console.log('User updated');
              res.redirect('/login');
            });
          }
        });
      }
    });
  },

  userProfile: function (req, res) {
    User.findOne().where({'id':req.session.userid}).exec(function (err, rec) {
      if(req.method=='POST')
      {
        console.log(req.body);
        if(req.body.old_pass != "" && req.body.new_pass != "") {
          if(req.body.old_pass != rec.password) {
            var data = {};
            data.error = "Your old password is wrong";
            res.locals.layout = 'layout1.ejs';
            return res.view('auth/userProfile.ejs',{'user': rec, 'data': data});
          } else if (req.body.new_pass.length <= 6) {
            var data = {};
            data.error = "password length must be greater than 6 character";
            res.locals.layout = 'layout1.ejs';
            return res.view('auth/userProfile.ejs',{'user': rec, 'data': data});
          } else if (req.body.new_pass !== req.body.conf_pass) {
            var data = {};
            data.error = "Please enter confirm password same as password";
            res.locals.layout = 'layout1.ejs';
            return res.view('auth/userProfile.ejs',{'user': rec, 'data': data});
          } else {
            rec.firstname = req.body.firstname;
            rec.lastname = req.body.lastname;
            rec.email = req.body.email;
            rec.password = req.body.new_pass;
            rec.save(function(err){
              if (err) {
                console.log(err);
                return res.send('Error');
              } else {
                res.redirect( '/dashboard');
              }
            });
          }
        } else {
          rec.firstname = req.body.firstname;
          rec.lastname = req.body.lastname;
          rec.email = req.body.email;
          rec.save(function(err){
            if (err) {
              console.log(err);
              return res.send('Error');
            } else {
              res.redirect( '/dashboard');
            }
          });
        }
        
      } else {
        res.locals.layout = 'layout1.ejs';
        return res.view('auth/userProfile.ejs',{'user': rec, data: {}});
      }
    });
  },


};