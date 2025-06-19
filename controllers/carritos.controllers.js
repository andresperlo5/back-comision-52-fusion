const {
  agregarProductosCarritoServices,
  eliminarProductoCarritioIdServices,
  obtenerTodosLosProductosDelCarritoServices,
} = require("../services/carritos.services");

const obtenerTodosLosProductosDelCarrito = async (req, res) => {
  const { msg, productos, error, statusCode } =
    await obtenerTodosLosProductosDelCarritoServices(req.idCarrito);
  try {
    res.status(statusCode).json({ msg, productos });
  } catch {
    res.status(statuCode).json({ error });
  }
};

const agregarProductosCarrito = async (req, res) => {
  const { msg, statusCode, error } = await agregarProductosCarritoServices(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statuCode).json({ error });
  }
};

const eliminarProductoCarritioId = async (req, res) => {
  const { msg, statusCode, error } = await eliminarProductoCarritioIdServices(
    req.idCarrito,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerTodosLosProductosDelCarrito,
  agregarProductosCarrito,
  eliminarProductoCarritioId,
};
