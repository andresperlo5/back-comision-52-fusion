const UsuariosModel = require("../models/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CarritosModel = require("../models/carrito.model");
const {
  registroExitoso,
  recuperarContrasenia,
} = require("../helpers/mensajes.nodemailer.helpers");

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
  try {
    const nuevoUsuario = new UsuariosModel(body);
    const carritoUsuario = new CarritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(nuevoUsuario.contrasenia);
    nuevoUsuario.idCarrito = carritoUsuario._id;

    const { statusCode, error } = await registroExitoso(
      body.emailUsuario,
      body.nombreUsuario
    );

    if (statusCode === 200) {
      await nuevoUsuario.save();
      await carritoUsuario.save();

      return {
        msg: "Usuario Creado",
        statusCode: 201,
      };
    } else {
      return {
        error,
        statusCode,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
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
    idCarrito: usuarioExiste.idCarrito,
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

const recuperarContraseniaUsuarioServices = async (emailUsuario) => {
  try {
    console.log(emailUsuario);
    const usuarioExiste = await UsuariosModel.findOne({ emailUsuario });
    console.log(usuarioExiste);

    if (usuarioExiste) {
      const payload = {
        idUsuario: usuarioExiste._id,
      };

      const tokenRecuperarContrasenia = jwt.sign(
        payload,
        process.env.JWT_SECRET_RECOVEY_PASS
      );

      await recuperarContrasenia(
        tokenRecuperarContrasenia,
        usuarioExiste.emailUsuario
      );

      return {
        msg: "Mail enviado",
        statusCode: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const cambioDeContraseniaUsuarioTokenServices = async (
  token,
  nuevaContrasenia
) => {
  console.log("token services", token);
  console.log("pass services", nuevaContrasenia);
  try {
    const verificarUsuario = jwt.verify(
      token,
      process.env.JWT_SECRET_RECOVEY_PASS
    );

    const usuario = await UsuariosModel.findOne({
      _id: verificarUsuario.idUsuario,
    });

    usuario.contrasenia = await argon.hash(nuevaContrasenia);
    await usuario.save();

    return {
      msg: "Cambio de contraseña exitoso",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  obtenerTodosLosUsuariosServices,
  obtenerUnUsuarioPorIdServices,
  crearUsuarioServices,
  iniciarSesionServices,
  recuperarContraseniaUsuarioServices,
  cambioDeContraseniaUsuarioTokenServices,
};
