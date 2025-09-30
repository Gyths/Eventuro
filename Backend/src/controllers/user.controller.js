export function protectedHello(req, res) {
  res.send(`Hola ${req.user?.name ?? 'usuario'} (${req.user?.email})`);
}
