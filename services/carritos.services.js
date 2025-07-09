const CarritosModel = require("../models/carrito.model");
const ProductosModel = require("../models/producto.model");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const obtenerTodosLosProductosDelCarritoServices = async (idCarrito) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    console.log(carrito.productos);
    return {
      productos: carrito.productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarProductosCarritoServices = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const producto = await ProductosModel.findOne({ _id: idProducto });

    const productoExiste = carrito.productos.find(
      (prod) => prod._id.toString() === producto._id.toString()
    );

    if (productoExiste) {
      return {
        msg: "EL producto ya esta en el carrito",
        statusCode: 422,
      };
    }

    carrito.productos.push(producto);

    await carrito.save();

    return {
      msg: "Producto cargado al carrito",
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

const eliminarProductoCarritioIdServices = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });

    const productoExiste = carrito.productos.find(
      (prod) => prod._id.toString() === idProducto
    );

    if (!productoExiste) {
      return {
        msg: "ERROR. EL producto que intentas borrar no existe",
        statusCode: 404,
      };
    }

    const productoIndex = carrito.productos.findIndex(
      (prod) => prod._id.toString() === idProducto
    );

    carrito.productos.splice(productoIndex, 1);

    await carrito.save();

    return {
      msg: "Producto eliminado",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const mercadoPagoServices = async (carrito) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: `${process.env.ACCESS_TOKEN_MP}`,
    });

    const preference = new Preference(client);

    const res = await preference.create({
      body: {
        items: [
          {
            title: "Celular",
            quantity: 1,
            unit_price: 2000,
            currency_id: "ARS",
          },
          {
            title: "Smartv",
            quantity: 1,
            unit_price: 2000,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://localhost:5173/user/cart?success",
          failure: "https://localhost:5173/user/cart?failure",
          pending: "https://localhost:5173/user/cart?pending",
        },
      },
    });

    console.log(res);
    /*  return {
      msg: res.init_point,
      statusCode: 200,
    }; */
    return {
      msg: res.id,
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
  obtenerTodosLosProductosDelCarritoServices,
  agregarProductosCarritoServices,
  eliminarProductoCarritioIdServices,
  mercadoPagoServices,
};
