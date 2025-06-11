const UsuariosModel = require("../models/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const obtenerTodosLosUsuariosServices = async () => {
  const usuarios = await UsuariosModel.find();
  return {
    usuarios,
    statusCode: 200,
  };
};

const obtenerUnUsuarioPorIdServices = async (idUsuario) => {
  const usuario = await UsuariosModel.findOne({ _id: idUsuario });

  return {
    usuario,
    statusCode: 200,
  };
};

const crearUsuarioServices = async (body) => {
  const nuevoUsuario = new UsuariosModel(body);
  nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
  await nuevoUsuario.save();

  return {
    msg: "Usuario Creado",
    statusCode: 201,
  };
};

const iniciarSesionServices = async (body) => {
  const usuarioExiste = await UsuariosModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });

  if (!usuarioExiste) {
    return {
      msg: "usuario y/o contraseña incorrecto. USER",
      statusCode: 400,
    };
  }

  const passCheck = await argon.verify(
    usuarioExiste.contrasenia,
    body.contrasenia
  );

  if (!passCheck) {
    return {
      msg: "usuario y/o contraseña incorrecto. PASS",
      statusCode: 400,
    };
  }

  //TOKEN
  const payload = {
    idUsuario: usuarioExiste._id,
    rolUsuario: usuarioExiste.rolUsuario,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return {
    msg: "Usuario Logueado",
    token,
    rol: usuarioExiste.rolUsuario,
    statusCode: 200,
  };
};

module.exports = {
  obtenerTodosLosUsuariosServices,
  obtenerUnUsuarioPorIdServices,
  crearUsuarioServices,
  iniciarSesionServices,
};
