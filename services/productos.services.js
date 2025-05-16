const productos = [
  {
    id: 1,
    nombre: "Coca-cola",
    descripcion: "la mejor",
    precio: 2500,
  },
  {
    id: 2,
    nombre: "Pepsi",
    descripcion: "la segunda opcion",
    precio: 2000,
  },
];

const obtenerTodosLosProductosServices = () => {
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerUnProductoPorIDServices = (idProducto) => {
  const producto = productos.find((prod) => prod.id === Number(idProducto));

  return {
    producto,
    statusCode: 200,
  };
};

const crearNuevoProductoServices = (body) => {
  const nuevoProducto = {
    id: productos[productos.length - 1]?.id + 1 || 1,
    nombre: body.nombre,
    descripcion: body.descripcion,
    precio: body.precio,
  };

  productos.push(nuevoProducto);

  return {
    msg: "Producto creado con exito",
    statusCode: 201,
  };
};

const actualizarProductoPorIDServices = (idProducto, body) => {
  const indexProd = productos.findIndex(
    (prod) => prod.id === Number(idProducto)
  );
  const producto = productos.find((prod) => prod.id === Number(idProducto));

  const { nombre, descripcion, precio } = body;

  const productoActualizado = {
    id: idProducto,
    nombre: nombre ? nombre : producto.nombre,
    descripcion: descripcion ? descripcion : producto.descripcion,
    precio: precio ? precio : producto.precio,
  };

  productos[indexProd] = productoActualizado;

  return {
    msg: "Producto editado con exito",
    statusCode: 200,
  };
};

const eliminarUnProductoPorIdServices = (idProducto) => {
  const indexProd = productos.findIndex(
    (prod) => prod.id === Number(idProducto)
  );

  productos.splice(indexProd, 1);

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
