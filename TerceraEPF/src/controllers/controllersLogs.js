export function LogOut(req, res) {
  const { email } = req.body;
  req.logout(function (err) {
    if (err) { return next(err); }
    return res.send(`bye ${email}`);
  });
};
