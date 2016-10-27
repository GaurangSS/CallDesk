var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var twilio = require('twilio');
var shortid = require('shortid');
var v = require('validator');

var transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: 'softsuggest',
        pass: '1800sendgrid'
    }
}));

module.exports = {

  ShowLogin: function (req, res) {
    var data = {};
    return res.view('auth/login.ejs',{data});
  },

  Authentication: function (req, res) {

    var email = v.trim(req.body.email).toLowerCase();
    var password = req.body.password;

    User.findOne({email:email,password:password}).exec(function findCallback(err, record){

        if (!record) {
          var data = {};
          data.error = "Username and Password does not match";
          return res.view('auth/login.ejs',{data: data});

        } else { 
          if (record.active != '1') {
            var data = {};
            data.error = "Please active your account first";
            return res.view('auth/login.ejs',{data: data});
          }
            var data = {};

            req.session.authenticated = true;
            req.session.userid = record.id;
            res.locals.layout = 'layout1.ejs';     
          return res.redirect('/dashboard');
        }
     })
  },

  getSignup: function (req, res) {
    return res.view('auth/signUp.ejs', {data : {}, user : {}});
  },

  postSignup: function (req, res) {

    var body = req.body;

    body.user_type_id = '1';
    body.parent_id = '0';

    // Sanitize input
    body.email = v.trim(body.email).toLowerCase();
    body.firstname = v.trim(body.firstname);
    body.lastame = v.trim(body.lastname);
    // Validate
    var errors = [];
    if (!v.isEmail(body.email)) {
      var data = {};
      data.error = "Invalid email address";      
      return res.view('auth/signUp.ejs',{user: body, data: data});
    }
    if (body.password !== body.password_confirm) {
      var data = {};
      data.error = "Password doesn't match with confirm password";
      
      return res.view('auth/signUp.ejs',{user: body, data: data});
    }
    if (body.password.length <=6 ) {
      var data = {};
      data.error = "Password length must be greater than 6";
      
      return res.view('auth/signUp.ejs',{user: body, data: data});
    }

    if (body.email) {
      User.findOne().where({'email': body.email}).exec(function (err, data) {
        if(err) {
          res.redirect('/signUp');
        } else if(data){
          var data = {};
          data.error = "You already have an account on CallDesk. Please login to your existing account or recover your password in case you forgot it.";
          
          res.view('auth/signUp.ejs',{user: body, data: data});
        } else {
          User.create(body, function (err, user) {
            if (err) {
              var data = {};
              data.error = err.message;
              res.view('auth/signUp.ejs',{user: body, data: data});

            } else {
              var user_status = {};
              user_status.user_id = user.id;
              user_status.availibility_status = 1;
             
              user_status.assign_device_status = 0;
              user_status.assign_device_num = null;
             
              User_status_info.create(user_status, function(err2,auth2) {
                if(err2) {
                  console.log(err2);
                }
                else {
                  console.log('User status created successfully');
                }
              });
              console.log(user);
              var tokenData = {}
              tokenData.userId = user.id;
              tokenData.hash = shortid.generate() + shortid.generate();
              tokenData.type = 'activate';

              tokens.create(tokenData, function (err, token){
                if(err){
                  console.log(err.message);
                } else {
                  console.log('Token generated successfully.');
                  //
                  var url = sails.config.myconf.keyword.rootpath + '/activate/' + token.hash

                 var mailOptions = {
                   from: 'isha@softwaresuggest.com', // sender address
                   to: user.email, // list of receivers
                   subject: 'Active Your CallDesk Account', // Subject line
                   text: 'Hello ' + user.firstname, // plaintext body
                   html: "<html><body>Welcome you in CallDesk.io. Before use our service You have to confirm your email address. So Plaease active your account by clicking below :  </b><a href="+url+">Click Here for Activate</a></body></html>" // html body
                 };                    
                  // send mail with defined transport object
                  transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                      console.log(error);
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                  });
                   //     url: ctx.protocol + '://' + ctx.host + '/activate/' + token
                }
              });
              console.log('User created successfully');
              res.redirect('/login');
            }
          });
        }
      });
    }
  },
};