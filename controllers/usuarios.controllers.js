const {
  obtenerTodosLosUsuariosServices,
  obtenerUnUsuarioPorIdServices,
  crearUsuarioServices,
  iniciarSesionServices,
  recuperarContraseniaUsuarioServices,
  cambioDeContraseniaUsuarioTokenServices,
} = require("../services/usuarios.services");
const { validationResult } = require("express-validator");

const obtenerTodosLosUsuarios = async (req, res) => {
  const { statusCode, usuarios } = await obtenerTodosLosUsuariosServices();
  res.status(statusCode).json({ usuarios });
};

const obtenerUnUsuarioPorId = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(422).json({
      msg: "Se encontraron errores en el servidor",
      errors: errors.array(),
    });
  }

  const { statusCode, usuario } = await obtenerUnUsuarioPorIdServices(
    req.params.id
  );
  res.status(statusCode).json({ usuario });
};

const crearNuevoUsuario = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(422).json({
      msg: "Se encontraron errores en el servidor",
      errors: errors.array(),
    });
  }

  const { statusCode, msg } = await crearUsuarioServices(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesion = async (req, res) => {
  const { statusCode, msg, token, rol } = await iniciarSesionServices(req.body);
  res.status(statusCode).json({ msg, token, rol });
};

const recuperarContraseniaUsuario = async (req, res) => {
  const { msg, statusCode, error } = await recuperarContraseniaUsuarioServices(
    req.body.emailUsuario
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const cambioDeContraseniaUsuarioToken = async (req, res) => {
  console.log("token query", req.query.token);
  const { msg, statusCode, error } =
    await cambioDeContraseniaUsuarioTokenServices(
      req.query.token,
      req.body.contrasenia
    );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
  recuperarContraseniaUsuario,
  cambioDeContraseniaUsuarioToken,
};
