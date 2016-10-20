var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var twilio = require('twilio');
var shortid = require('shortid');
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
    data.msg = 'success';
    return res.view('auth/login.ejs',data);
  },

  Authentication: function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email,password:password}).exec(function findCallback(err, record){
        
        if (!record) {
          var err = "Username and Password does not match";
          return res.view('auth/login.ejs',err);

        } else {
            var data = {};

            var identity = 'kevin';
    
            var capability = new twilio.Capability(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
                  sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
                capability.allowClientOutgoing(sails.config.myconf.twilioDetails.TWILIO_TWIML_APP_SID);

            capability.allowClientIncoming(identity);

            var token = capability.generate();


             data.identity = identity;
             data.token = token;
             req.session.authenticated = true;
             req.session.userid = record.id;
          res.locals.layout = 'layout1.ejs';     
          return res.redirect('/users');
        }
     })
  },

  getSignup: function (req, res) {
    return res.view('auth/signUp.ejs', {data : {}, user : {}});
  },

  postSignup: function (req, res) {
    var form_data = req.body;
    console.log(form_data)

    if (form_data.password !== form_data.password_confirm) {
      var data = {};

      data.error = "Password doesn't match with confirm password";
      
      res.view('auth/signUp.ejs',{user: form_data, data: data});
    } else {

      User.create(form_data, function (err, user) {
        if (err) {
          var data = {};
          data.error = err.message;
          res.view('auth/signUp.ejs',{user: form_data, data: data});

        } else {
          console.log('User created successfully');
          console.log('-=-=');
          console.log(user);
          var tokenData = {}
          tokenData.userId = user.id;
          tokenData.hash = shortid.generate() + shortid.generate();
          tokenData.type = 'activate';
          console.log(tokenData);
          tokens.create(tokenData, function (err, token){
            if(err){
              console.log(err.message);
            } else {
              console.log('Token generated successfully.');
              var url = sails.config.myconf.mailServerDetail.protocol + '://' + sails.config.myconf.mailServerDetail.host + '/activate/' + token.hash
              var mailOptions = {
                  from: 'gaurang@softwaresuggest.com', // sender address 
                  to: user.email, // list of receivers 
                  subject: 'Activatioin mail for sign up', // Subject line 
                  text: 'Hello ' + user.firstname, // plaintext body 
                  html: '<html><body><b>Hello world 🐴</b><a href=" + url +">Click Here for Activate</a></body></html>' // html body 
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
          res.redirect('/login');
        }
      });
    }
  },
};