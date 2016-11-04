var shortid = require('shortid');
var v = require('validator');

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
        //    data.error = "Please active your account first";
            data.error = "You have been added to beta list. We will inform you shortly";
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
                  var url = sails.config.myconf.keyword.localpath + '/activate/' + token.hash
                  var mailOptions = {
                    email : 'ankit@softwaresuggest.com',
                    cc : 'asish@softwaresuggest.com',
                    subject : "New Signup in CallDesk.io",
                    emailbody : "<html><body><table border='1'><tr><td>First Name</td><td>"+ user.firstname +"</td></tr><tr><td>Last Name</td><td>"+ user.lastname +"</td></tr><tr><td>Email</td><td>"+ user.email +"</td></tr><tr><td>Company Name</td><td>"+ user.company_name +"</td></tr><tr><td>Mobile</td><td>"+ user.mob_num +"</td></tr></table></body></html>",
              //      emailtext : 'Hello' + user.firstname,
                  }
                  mail.sendMail(mailOptions);

                }
              });
              console.log('User created successfully');
              var data = {};
               data.error = "You have been added to beta list. We will inform you shortly.";
               return res.view('auth/login.ejs',{data});
            }
          });
        }
      });
    }
  },
};