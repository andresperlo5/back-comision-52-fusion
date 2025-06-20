const {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
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
  const { msg, statusCode } = await crearNuevoProductoServices(
    req.body,
    req.file
  );
  res.status(statusCode).json({ msg });
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

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
};
