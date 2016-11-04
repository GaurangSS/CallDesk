var nodemailer = require ('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {

  sendMailVarify: function (options,done){
    var transporter = nodemailer.createTransport(smtpTransport({
        host: sails.config.myconf.mailDetails.host,
		    port: sails.config.myconf.mailDetails.port,
        auth: {
          user: sails.config.myconf.mailDetails.user,
          pass: sails.config.myconf.mailDetails.pass
        }
      }));

    var mailOptions = {
      from: sails.config.myconf.mailDetails.from, // sender address
      to: options.email, // list of receivers
      cc: options.cc,
      subject: options.subject, // Subject line
     	text: options.emailtext, // plaintext body
      html: options.emailbody, // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
      console.log('Message sent: ' + info.response);
      return done(error, 'done');
    });
  },

  sendMail: function (options) {
  	console.log(options)
    
    // call service for sending mail
    mail.sendMailVarify(options, function (err,done) {
      if (err) {console.log (err)}
    });
  },
};