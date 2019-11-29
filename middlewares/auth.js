const isLogin = (req, res, next) => {
  if (req.session.user == null || req.session.user == undefined) {
    req.flash('alertMessage', 'Mohon Maaf Session Anda Telah Habis Silahakan Login Kembali!');
    req.flash('alertStatus', 'danger');
    res.redirect('/signin');
  } else {
    next();
  }
}

module.exports = {
  isLogin: isLogin
};