const {
  obtenerTodosLosUsuariosServices,
  obtenerUnUsuarioPorIdServices,
  crearUsuarioServices,
  iniciarSesionServices,
} = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { statusCode, usuarios } = await obtenerTodosLosUsuariosServices();
  res.status(statusCode).json({ usuarios });
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const { statusCode, usuario } = await obtenerUnUsuarioPorIdServices(
    req.params.id
  );
  res.status(statusCode).json({ usuario });
};

const crearNuevoUsuario = async (req, res) => {
  const { statusCode, msg } = await crearUsuarioServices(req.body);
  res.status(statusCode).json({ msg });
};

const iniciarSesion = async (req, res) => {
  const { statusCode, msg } = await iniciarSesionServices(req.body);
  res.status(statusCode).json({ msg });
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
};
