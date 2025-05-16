const {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
} = require("../services/productos.services");

const obtenerTodosLosProductos = (req, res) => {
  const { productos, statusCode } = obtenerTodosLosProductosServices();
  res.status(statusCode).json({ productos });
};

const obtenerUnProductoPorID = (req, res) => {
  const { producto, statusCode } = obtenerUnProductoPorIDServices(
    req.params.id
  );
  res.status(statusCode).json({ producto });
};

const crearNuevoProducto = (req, res) => {
  const { msg, statusCode } = crearNuevoProductoServices(req.body);
  res.status(statusCode).json({ msg });
};

const actualizarProductoPorID = (req, res) => {
  const { msg, statusCode } = actualizarProductoPorIDServices(
    req.params.id,
    req.body
  );

  res.status(statusCode).json({ msg });
};

const eliminarUnProductoPorId = (req, res) => {
  const { msg, statusCode } = eliminarUnProductoPorIdServices(req.params.id);
  res.status(statusCode).json({ msg });
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
};
