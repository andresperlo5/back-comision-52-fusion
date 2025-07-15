const {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
  crearEditarImagenService,
  cambiarEstadoProductoServices,
} = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  const { productos, statusCode } = await obtenerTodosLosProductosServices();
  res.status(statusCode).json({ productos });
};

const obtenerUnProductoPorID = async (req, res) => {
  const { producto, statusCode } = await obtenerUnProductoPorIDServices(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = async (req, res) => {
  const { msg, statusCode, idProducto } = await crearNuevoProductoServices(
    req.body,
    req.file
  );
  res.status(statusCode).json({ msg, idProducto });
};

const crearEditarImagen = async (req, res) => {
  const { statusCode, error, msg } = await crearEditarImagenService(
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

const actualizarProductoPorID = async (req, res) => {
  const { msg, statusCode } = await actualizarProductoPorIDServices(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ msg });
};

const eliminarUnProductoPorId = async (req, res) => {
  const { msg, statusCode } = await eliminarUnProductoPorIdServices(
    req.params.id
  );
  res.status(statusCode).json({ msg });
};

const cambiarEstadoProducto = async (req, res) => {
  const { msg, statusCode, error } = await cambiarEstadoProductoServices(
    req.params.idProducto
  );

  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  crearEditarImagen,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
  cambiarEstadoProducto,
};
