module.exports.myconf = {
 /* facebookDetails: {
    clientID: "220971638302599", 
    clientSecret: "e1cac0630d5cdecfc4bea1efe31fd7a0", 
    callbackURL: "http://localhost:1337/auth/facebook/callback"
  },
  smsDetails: {
    userid: '2000152419',
    password: 'j17DkI6TH'
  },*/
  // test Details
  /*twilioDetails: {
    TWILIO_ACCOUNT_SID: 'ACa0a28d19157afd80b7c2a21380b83471',
    TWILIO_AUTH_TOKEN: '82385642275d0b75d8d3b3ae307ca423',
    TWILIO_TWIML_APP_SID: 'AP62de5fcb06e045dd3b0e3c7b43783925',
  },*/
  // Live Details
  twilioDetails: {
    TWILIO_ACCOUNT_SID: 'ACa2b4650ccddd568c2362d837f224e96a',
    TWILIO_AUTH_TOKEN: 'd28d0badd4ec9d419fdc47ff14cadaf0',
    TWILIO_TWIML_APP_SID: 'AP1d5e33d65adea5abfd11f9bf36369e61',
  },
  
  mailServerDetail: {
    host:'smtp.sendgrid.net',
    protocol:'587'
  },

  keyword: {
    rootpath: 'https://demo.calldesk.io',
    localpath: 'http://localhost:1337'
  },
};
