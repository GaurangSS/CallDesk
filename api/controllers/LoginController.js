var twilio = require('twilio');
module.exports = {

  ShowLogin: function (req, res) {  
    return res.view('login.ejs');
 
  },

  Authentication: function (req, res) {

    //console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username:username,password:password}).exec(function findCallback(err, record){
        
        console.log(err);
        if(!record){
          return res.view('login.ejs',err);   

        }else{   

            var data = {};

            var identity = 'kevin';
    
            var capability = new twilio.Capability(sails.config.myconf.twilioDetails.TWILIO_ACCOUNT_SID,
                  sails.config.myconf.twilioDetails.TWILIO_AUTH_TOKEN);
                capability.allowClientOutgoing(sails.config.myconf.twilioDetails.TWILIO_TWIML_APP_SID);

            capability.allowClientIncoming(identity);

            var token = capability.generate();

            data.identity = identity;
            data.token = token;
            var user_data = {};

            user_data.id  = record.id;
              if(user_data.id){
                req.session.authenticated = true;
                res.locals.layout = 'layout1.ejs';     
                return res.redirect('/home');          
              }else{
                return res.redirect('/login'); 
              }
          
        }

     })

  },
 
};