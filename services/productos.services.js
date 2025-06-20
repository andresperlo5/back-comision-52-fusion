const cloudinary = require("../middlewars/cloudinary.config.middlewares");
const ProductosModel = require("../models/producto.model");

const obtenerTodosLosProductosServices = async () => {
  const productos = await ProductosModel.find();
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerUnProductoPorIDServices = async (idProducto) => {
  const producto = await ProductosModel.findOne({ _id: idProducto });
  return {
    producto,
    statusCode: 200,
  };
};

const crearNuevoProductoServices = async (body, file) => {
  const nuevoProducto = new ProductosModel(body);
  const imagenCloud = await cloudinary.uploader.upload(file.path);
  nuevoProducto.imagen = imagenCloud.secure_url;
  await nuevoProducto.save();
  return {
    msg: "Producto creado con exito",
    statusCode: 201,
  };
};

const actualizarProductoPorIDServices = async (idProducto, body) => {
  await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body);
  return {
    msg: "Producto editado con exito",
    statusCode: 200,
  };
};

const eliminarUnProductoPorIdServices = async (idProducto) => {
  await ProductosModel.findByIdAndDelete({ _id: idProducto });

  return {
    msg: "Producto eliminado",
    statusCode: 200,
  };
};

module.exports = {
  obtenerTodosLosProductosServices,
  obtenerUnProductoPorIDServices,
  crearNuevoProductoServices,
  actualizarProductoPorIDServices,
  eliminarUnProductoPorIdServices,
};
