module.exports = {

 //for sending sms using service send_sms
  createToken: function (options) {

    send_sms.sendMsg ({ msg:options.msg, contact_number: options.phone }, function (err,done) {
      if(err) {
        console.log ({err : err})
      } 
    });
  },

};