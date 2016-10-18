var twilio = require('twilio');
module.exports = {

  ShowLogin: function (req, res) {  
    var data = {};
    data.msg = 'success';
    return res.view('login.ejs',data);
  },

  Authentication: function (req, res) {

    //console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email,password:password}).exec(function findCallback(err, record){
        
        console.log(record);
        if(!record){
          var err = "Username and Password does not match";
          return res.view('login.ejs',err);   

        }else{   
          console.log(record.id);
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
    res.locals.layout = 'layout1.ejs';
    return res.view('signUp.ejs', {data : {}, user : {}});
  },

  postSignup: function (req, res) {
    var form_data = req.body;
    console.log(form_data);
    if (form_data.password !== form_data.password_confirm) {
      var data = {};

      data.error = "Password doesn't match with confirm password";
      
      res.view('signUp.ejs',{user: form_data, data: data});
    }

    User.create(form_data, function (err, user) {
      if (err){
        console.log(err);
      } else {
        console.log('User created successfully');
        res.redirect('/login');
      }
    });
    
  },

};