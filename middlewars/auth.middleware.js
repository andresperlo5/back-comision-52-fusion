const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => (req, res, next) => {
  const token = req.header("auth");
  console.log(token);
  const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verificarUsuario);

  if (rolRuta === verificarUsuario.rolUsuario) {
    next();
  } else {
    res.status(401).json({ msg: "No estas autorizado" });
  }
};
