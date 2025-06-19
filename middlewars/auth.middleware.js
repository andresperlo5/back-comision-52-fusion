const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  const token = req.header("auth");
  const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);

  if (rolRuta === verificarUsuario.rolUsuario) {
    req.idCarrito = verificarUsuario.idCarrito;
    req.idUsuario = verificarUsuario.idUsuario;
    next();
  } else {
    res.status(401).json({ msg: "No estas autorizado" });
  }
};
