export function home(req, res) {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
}

export function failure(req, res) {
  res.send('Algo salió mal');
}

export function logout(req, res, next) {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => res.send('miau'));
  });
}
