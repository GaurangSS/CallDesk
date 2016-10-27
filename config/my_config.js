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
  twilioDetails: {
    TWILIO_ACCOUNT_SID: 'AC7c19a45de58c820b3566b33ee87edb3b',
    TWILIO_AUTH_TOKEN: '7a9a1fb9a0e59dee4a51f20cb6a23e92',
    TWILIO_TWIML_APP_SID: 'AP62de5fcb06e045dd3b0e3c7b43783925',
  },
  // Live Details
  /*twilioDetails: {
    TWILIO_ACCOUNT_SID: 'ACe732ab6c48c553e824547bce75dfc861',
    TWILIO_AUTH_TOKEN: '1ee4bc07c48d297d817016756d8008f4',
    TWILIO_TWIML_APP_SID: 'AP1d5e33d65adea5abfd11f9bf36369e61',
  },*/
  
  mailDetails: {
    host: 'smtp.sendgrid.net',
    port: '587',
    user: 'softsuggest',
    pass: '1800sendgrid',
    from: 'isha@softwaresuggest.com',
  },

  mailServerDetail: {
    host:'smtp.sendgrid.net',
    protocol:'587'
  },

  keyword: {
    // live path
    rootpath: 'https://demo.calldesk.io',
    // Localpath
    //rootpath: 'http://localhost:1337'
  },
};
