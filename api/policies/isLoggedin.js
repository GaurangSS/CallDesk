module.exports = function(req, res, next) {
  if (!req.user) {
    return next();
  } else if (req.user.user_data.id){
    return res.redirect('/home');
  } else {
    return next();
  }

};

