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
 
};