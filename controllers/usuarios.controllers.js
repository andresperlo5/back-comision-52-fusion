const usuarios = [];

const obtenerTodosLosUsuarios = (req, res) => {
  res.status(200).json({ usuarios });
};

module.exports = {
  obtenerTodosLosUsuarios,
};
